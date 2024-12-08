import { MongoClient, Collection, InsertOneResult, ObjectId, UpdateResult, DeleteResult } from "mongodb";
import { NextRequest, NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';
import { Technology, Course, CourseDocument, TechRosterData } from "@/tools/data.model";

// MongoDB constants
const MONGO_URL:string = "mongodb://mongo:27017/";
const MONGO_DB_NAME:string = "dbTechs";	
const MONGO_COLLECTION_TECHS:string = "technologies";
const MONGO_COLLECTION_COURSES: string = "courses";

// gets the technologies and courses data
export async function getAllData() {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db(MONGO_DB_NAME);
        
        // Grab both collections in one request using Promise constructor
        const [technologies, courses] = await Promise.all([
            db.collection<Technology>(MONGO_COLLECTION_TECHS).find().toArray(),
            db.collection<CourseDocument>(MONGO_COLLECTION_COURSES).find().toArray()
        ]);

        // Convert ObjectIds to strings
        technologies.forEach((tech: any) => tech._id = tech._id.toString());
        courses.forEach((course: any) => course._id = course._id.toString());

        return { technologies, courses };
    } catch (error: any) {
        console.log(`>>> ERROR : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }
}

export async function createTechnology(request: NextRequest) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect(); 

        // fetch the body from the request (async task)
        const body:any = await request.json();

        // sanitizing input
        body.name = sanitizeHtml(body.name);
        body.description = sanitizeHtml(body.description);
        body.difficulty = sanitizeHtml(body.difficulty);
        body.courses.forEach((course:Course) => {
            course.code = sanitizeHtml(course.code);
            course.name = sanitizeHtml(course.name);
        });

        // insert new document into DB
        let result:InsertOneResult = await mongoClient.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_TECHS).insertOne(body);

        // returning response and setting status code to 200
        return NextResponse.json(result, {status: 200});

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    } finally {
        mongoClient.close();
    }
}

export async function updateTechnology(request: NextRequest, id:string) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect(); 

        // sanitize id and convert to ObjectId
        let techID:ObjectId = new ObjectId(sanitizeHtml(id));

        // fetch the body from the request (async task)
        const body:any = await request.json();
        // sanitizing input
        body.name = sanitizeHtml(body.name);
        body.description = sanitizeHtml(body.description);
        body.difficulty = sanitizeHtml(body.difficulty);
        body.courses.forEach((course:Course) => {
            course.code = sanitizeHtml(course.code);
            course.name = sanitizeHtml(course.name);
        });

        // update document
        let techCollection:Collection = mongoClient.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_TECHS);
        let selector:Object = { "_id": techID };
        let newValues:Object = { $set: body };
        let result:UpdateResult = await techCollection.updateOne(selector, newValues);

        // check if edited correctly
        if (result.matchedCount <= 0) {
            return NextResponse.json({error: "No technology documents found with ID"}, {status: 404});
        } else {
            // status code for deleted
            return NextResponse.json(result, {status: 200});
        }		
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    } finally {
        mongoClient.close();
    }
}

export async function deleteTechnology(request: NextRequest, id:string) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect(); 

        // sanitize id and convert to ObjectId
        let techID:ObjectId = new ObjectId(sanitizeHtml(id));

        // delete document
        let techCollection:Collection = mongoClient.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_TECHS);
        let selector:Object = { "_id": techID };
        let result:DeleteResult = await techCollection.deleteOne(selector); 

        // check if deleted correctly
        if (result.deletedCount <= 0) {
            return NextResponse.json({error: "No technology documents found with ID"}, {status: 404});
        } else {
            // status code for deleted
            return NextResponse.json(result, {status: 200});
        }
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    } finally {
        mongoClient.close();
    }
}

export async function createCourse(request: NextRequest) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect();
        const body: any = await request.json();

        // Sanitize input
        const sanitizedCourse = {
            code: sanitizeHtml(body.code),
            name: sanitizeHtml(body.name)
        };

        // Check if course code already exists
        const existingCourse = await mongoClient
            .db(MONGO_DB_NAME)
            .collection(MONGO_COLLECTION_COURSES)
            .findOne({ code: sanitizedCourse.code });

        if (existingCourse) {
            return NextResponse.json(
                { error: "Course code already exists" },
                { status: 400 }
            );
        }

        // Insert new course
        const result: InsertOneResult = await mongoClient
            .db(MONGO_DB_NAME)
            .collection(MONGO_COLLECTION_COURSES)
            .insertOne(sanitizedCourse);

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        mongoClient.close();
    }
}