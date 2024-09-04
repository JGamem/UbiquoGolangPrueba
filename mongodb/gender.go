package mongodb

import (
	"context"
	"log"
	"ubiquogo/model"

	"go.mongodb.org/mongo-driver/bson"
)

func GetGender() []model.Gender {
	ctx := context.Background()
	client := Connection()
	collection := client.Database("heroes").Collection("gender")
	cur, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Fatalln(err)
	}
	defer cur.Close(ctx)

	var a []model.Gender
	if err = cur.All(ctx, &a); err != nil {
		log.Fatalln(err)
	}

	return a
}
