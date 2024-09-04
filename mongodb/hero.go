package mongodb

import (
	"context"
	"fmt"
	"log"
	"ubiquogo/commons"
	"ubiquogo/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetHeroes() []model.Hero {
	ctx := context.Background()
	client := Connection()
	collection := client.Database("heroes").Collection("hero_information")
	cur, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Fatalln(err)
	}
	defer cur.Close(ctx)

	var heroes []model.Hero
	if err = cur.All(ctx, &heroes); err != nil {
		log.Fatalln(err)
	}

	return heroes
}

func GetHero(field, value string) []model.Hero {
	ctx := context.Background()
	client := Connection()
	collection := client.Database("heroes").Collection("hero_information")
	f := commons.FiltersHero(field, value)
	log.Println(f)
	cur, err := collection.Find(ctx, f)
	if err != nil {
		log.Fatalln(err)
	}
	defer cur.Close(ctx)

	var heroes []model.Hero
	if err = cur.All(ctx, &heroes); err != nil {
		log.Fatalln(err)
	}

	return heroes
}

func NewHero(h model.Hero) string {
	ctx := context.Background()
	client := Connection()
	collection := client.Database("heroes").Collection("hero_information")
	r, err := collection.InsertOne(ctx, h)
	if err != nil {
		log.Println(err)
		return ""
	}
	defer client.Disconnect(ctx)

	log.Println("Inserted", r.InsertedID)

	return "Inserted"
}

func DelHero(ID string) error {
	ctx := context.Background()
	client := Connection()
	collection := client.Database("heroes").Collection("hero_information")
	objectID, _ := primitive.ObjectIDFromHex(ID)
	filter := bson.D{{Key: "_id", Value: objectID}}

	deleteResult, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		log.Panicln(err)
		return err
	}

	if deleteResult.DeletedCount == 0 {
		fmt.Println("No se encontró ningún héroe con ese ID.")
	} else {
		fmt.Printf("Héroe con ID %s eliminado.\n", ID)
	}
	return nil
}
