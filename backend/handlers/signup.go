package handlers

import (
	"net/http"

	"lms/backend/config"
	"lms/backend/models"

	"github.com/gin-gonic/gin"
)

// SignupRequest defines the input payload for signing up an owner.
type SignupRequest struct {
	Name          string `json:"name" binding:"required"`
	Email         string `json:"email" binding:"required,email"`
	ContactNumber string `json:"contact_number"`
	Role          string `json:"role" binding:"required"` // Must be "Owner"
}

// Signup allows the creation of an owner account without authentication.
func Signup(c *gin.Context) {
	var req SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Ensure that only an Owner is created using this endpoint.
	if req.Role != "Owner" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only an Owner can be registered via this endpoint"})
		return
	}

	owner := models.User{
		Name:          req.Name,
		Email:         req.Email,
		ContactNumber: req.ContactNumber,
		Role:          req.Role,
		// LibID remains zero until the owner creates a library.
	}

	if err := config.DB.Create(&owner).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create owner"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Owner created successfully", "owner": owner})
}
