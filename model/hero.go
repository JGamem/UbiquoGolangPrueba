package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Hero struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	HeroID      int                `bson:"hero_id,omitempty" json:"hero_id"`
	Name        string             `bson:"name,omitempty" json:"name"`
	EyeColor    string             `bson:"eye_color,omitempty omitempty" json:"eye_color"`
	HairColor   string             `bson:"hair_color,omitempty" json:"hair_color"`
	SkinColor   *string            `bson:"skin_color,omitempty" json:"skin_color"` // 'null' en JSON se representa como un puntero en Go
	Height      int                `bson:"height,omitempty" json:"height"`
	Weight      int                `bson:"weight,omitempty" json:"weight"`
	Race        string             `bson:"race,omitempty" json:"race"`
	PublisherID int                `bson:"publisher_id,omitempty" json:"publisher_id"`
	GenderID    int                `bson:"gender_id,omitempty" json:"gender_id"`
	AlignmentID int                `bson:"alignment_id,omitempty" json:"alignment_id"`
}

type Alignment struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id"`
	AlignmentID int                `json:"alignment_id,omitempty" bson:"alignment_id"`
	Name        string             `json:"name,omitempty" bson:"name"`
}

type Gender struct {
	ID       primitive.ObjectID `json:"id,omitempty" bson:"_id"`
	GenderID int                `json:"gender_id,omitempty" bson:"gender_id"`
	Name     string             `json:"name,omitempty" bson:"name"`
}

type Publisher struct {
	ID            primitive.ObjectID `json:"id,omitempty" bson:"_id"`
	PublisherID   int                `json:"publisher_id,omitempty" bson:"publisher_id"`
	PublisherName string             `json:"publisher_name,omitempty" bson:"publisher_name"`
}
