package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name          string `gorm:"not null"`
	Email         string `gorm:"unique;not null"`
	ContactNumber string
	Role          string `gorm:"not null"` // "Owner", "LibraryAdmin", or "Reader"
	LibID         uint   // Foreign key to Library (if applicable)
}
