package mongodb

import (
	"context"
	"log"
	"ubiquogo/model"

	"go.mongodb.org/mongo-driver/bson"
)

func GetPublisher() []model.Publisher {
	ctx := context.Background()
	client := Connection()
	collection := client.Database("heroes").Collection("publisher")
	cur, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Fatalln(err)
	}
	defer cur.Close(ctx)

	var a []model.Publisher
	if err = cur.All(ctx, &a); err != nil {
		log.Fatalln(err)
	}

	return a
}
