package models

import (
	"time"

	"gorm.io/gorm"
)

type IssueRegistry struct {
	gorm.Model
	ISBN               string `gorm:"not null"`
	ReaderID           uint   `gorm:"not null"`
	IssueApproverID    *uint
	IssueStatus        string    // e.g., "Issued", "Returned"
	IssueDate          time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	ExpectedReturnDate time.Time
	ReturnDate         *time.Time
	ReturnApproverID   *uint
}
