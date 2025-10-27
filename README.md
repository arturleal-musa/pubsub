# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).



<!-- 

cria um endpoint post que recebe um body em json

chama esse endpoint atraves do postman/insomnia

valida o json recebido com AJV Json Schema Validator


import { JSONSchemaType } from "ajv";
import {FastifyRequest, FastifySchema} from "fastify";
import {AddWordBodyInput} from "@/shared/dtos/student/words/add-word.body.input";
import {EWordStatus} from "@/shared/enums/e-word-status";
import {IdbWordModel} from "@/shared/dtos/idb/idb-word.model";

/**
 * ajv bug with null types
 *
 * https://github.com/ajv-validator/ajv/issues/2163
 *
 * const: null is the solution
 */
const AddWordBodySchema: JSONSchemaType<AddWordBodyInput> = {
    type: "object",
    properties: {
        videoId: {
            type: ["number", "null"], // bug ajv https://github.com/ajv-validator/ajv/issues/2163
            nullable: true,
        } as any,
        word: {
            type: "string",
        },
    },
    required: [
        // "videoId",
        "word",
    ],
    additionalProperties: false
}

const AddWordResponseSchema: JSONSchemaType<IdbWordModel> = {
    type: "object",
    properties: {
        id: { type: "integer" },
        studyPlansCount: { type: "integer" },
        studyPlansIds: { type: "string" },
        wordId: { type: "integer" },
        word: { type: "string" },
        videoId: {
            type: "integer",
        },
        factLastStatus: {
            type: "integer",
            enum: [
                EWordStatus.FORGOT_COMPLETELY,
                EWordStatus.FORGOT_PARTIALLY,
                EWordStatus.ALMOST_REMEMBERED,
                EWordStatus.CORRECT_HARD,
                EWordStatus.CORRECT_MEDIUM,
                EWordStatus.CORRECT_COMPLETELY,
            ],
        },
        factMean: {
            type: "number",
        },
        factStudyTimes: {
            type: "integer",
        },
        factLastStudyAt: {
            type: "string",
            format: "date-time",
        },
        sm2Repetition: { type: "integer" },
        sm2Interval: { type: "integer" },
        sm2Easiness: { type: "integer" },
        sm2NextReviewAt: { type: "string" },
        createdAt: {
            type: "string",
            format: "date-time"
        },
        status: {
            type: "number"
        }
    },
    required: [
        "id",
        "wordId",
        "word",
        "videoId",
        "factLastStatus",
        "factMean",
        "factStudyTimes",
        "factLastStudyAt",
        "createdAt",
        "status",
    ],
    additionalProperties: false
};

export const AddWordInputSchema: FastifySchema = {
    description: 'Ping Test Route',
    tags: ['Student'],
    response: {
        200: {
            description: 'Successful Response',
            properties: AddWordResponseSchema.properties
        }
    },
    body: AddWordBodySchema
}

export type AddWordRequest = FastifyRequest<{
    Body: AddWordBodyInput
}> -->
