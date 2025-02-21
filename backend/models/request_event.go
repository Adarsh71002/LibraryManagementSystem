package models

import (
	"time"

	"gorm.io/gorm"
)

type RequestEvent struct {
	gorm.Model
	BookID       string    `gorm:"not null"` // ISBN of the book
	ReaderID     uint      `gorm:"not null"` // ID of the reader (User)
	RequestDate  time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	ApprovalDate *time.Time
	ApproverID   *uint
	RequestType  string `gorm:"not null"` // e.g., "IssueRequest"
}
