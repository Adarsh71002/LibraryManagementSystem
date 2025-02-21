package models

type Book struct {
	// Composite primary key: ISBN and LibID.
	ISBN            string `gorm:"primaryKey"`
	LibID           uint   `gorm:"primaryKey"`
	Title           string `gorm:"not null"`
	Authors         string `gorm:"not null"`
	Publisher       string
	Version         string
	TotalCopies     int `gorm:"default:0"`
	AvailableCopies int `gorm:"default:0"`
}
