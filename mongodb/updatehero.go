package mongodb

import (
	"context"
	"log"
	"time"
	"ubiquogo/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateHero(ID primitive.ObjectID, h model.Hero) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client := Connection()
	collection := client.Database("heroes").Collection("hero_information")

	filter := bson.D{{Key: "_id", Value: ID}}

	update := bson.D{
		{Key: "$set", Value: bson.D{
			{Key: "name", Value: h.Name},
			{Key: "publisher", Value: h.PublisherID},
			{Key: "race", Value: h.Race},
			{Key: "gender", Value: h.GenderID},
			{Key: "alignment", Value: h.AlignmentID},
			{Key: "height", Value: h.Height},
			{Key: "weight", Value: h.Weight},
		}},
	}

	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Println("Error updating hero:", err)
		return err
	}

	return nil
}
