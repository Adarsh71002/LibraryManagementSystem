package handlers

import (
	"net/http"
	"time"

	"lms/backend/config"
	"lms/backend/middlewares"
	"lms/backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CreateReaderRequest struct {
	Name          string `json:"name" binding:"required"`
	Email         string `json:"email" binding:"required,email"`
	ContactNumber string `json:"contact_number" binding: "required,email"`
}

// CreateReader allows an admin (Owner or LibraryAdmin) to add a new reader to their library.
func CreateReader(c *gin.Context) {
	var req CreateReaderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Retrieve the current admin user from context.
	adminUser := c.MustGet(string(middlewares.UserContextKey)).(middlewares.User)

	// Create a new reader with the same LibID as the admin.
	reader := models.User{
		Name:          req.Name,
		Email:         req.Email,
		ContactNumber: req.ContactNumber,
		Role:          "Reader",
		LibID:         adminUser.LibID,
	}

	if err := config.DB.Create(&reader).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create reader"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Reader created successfully", "reader": reader})
}

// SearchBooks allows a reader to search for books by title, author, or publisher.
func SearchBooks(c *gin.Context) {
	user := c.MustGet(string(middlewares.UserContextKey)).(middlewares.User)
	libID := user.LibID

	title := c.Query("title")
	author := c.Query("author")
	publisher := c.Query("publisher")

	var books []models.Book
	query := config.DB.Where("lib_id = ?", libID)
	if title != "" {
		query = query.Where("title ILIKE ?", "%"+title+"%")
	}
	if author != "" {
		query = query.Where("authors ILIKE ?", "%"+author+"%")
	}
	if publisher != "" {
		query = query.Where("publisher ILIKE ?", "%"+publisher+"%")
	}
	if err := query.Find(&books).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error searching books"})
		return
	}

	var result []gin.H
	for _, book := range books {
		availability := "Available"
		if book.AvailableCopies <= 0 {
			var issue models.IssueRegistry
			err := config.DB.Where("isbn = ?", book.ISBN).Order("expected_return_date ASC").First(&issue).Error
			if err != nil {
				if err == gorm.ErrRecordNotFound {
					availability = "Not available"
				} else {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error fetching return date"})
					return
				}
			} else {
				availability = "Not available, expected return: " + issue.ExpectedReturnDate.Format("2006-01-02")
			}
		}
		result = append(result, gin.H{
			"isbn":             book.ISBN,
			"title":            book.Title,
			"authors":          book.Authors,
			"publisher":        book.Publisher,
			"version":          book.Version,
			"total_copies":     book.TotalCopies,
			"available_copies": book.AvailableCopies,
			"availability":     availability,
		})
	}
	c.JSON(http.StatusOK, gin.H{"books": result})
}

// RaiseRequest defines the JSON payload for raising an issue request.
type RaiseRequest struct {
	ISBN string `json:"ISBN" binding:"required"`
}

// RaiseIssueRequest allows a reader to raise an issue request.
func RaiseIssueRequest(c *gin.Context) {
	var req RaiseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing ISBN in request"})
		return
	}
	user := c.MustGet(string(middlewares.UserContextKey)).(middlewares.User)
	libID := user.LibID

	var book models.Book
	if err := config.DB.Where("isbn = ? AND lib_id = ?", req.ISBN, libID).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}
	if book.AvailableCopies <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Book is not available for issue"})
		return
	}
	issueRequest := models.RequestEvent{
		BookID:      req.ISBN,
		ReaderID:    user.ID,
		RequestType: "IssueRequest",
		RequestDate: time.Now(),
	}
	if err := config.DB.Create(&issueRequest).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error raising issue request"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Issue request raised successfully"})
}
