// FILE INTRO: This file contains logic for pre-route schema validations

const AJV = require('ajv');
const { gigCategoryEnum } = require('../models/data');

const ajv = new AJV()

const baseGigValidatorObject = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: true
}

const baseLoginObject = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" }
    },
    required: ["username", "password"],
}

const baseRegisterObject = {
    type: "object",
    properties: {
        email: {
            type: "string",
            minLength: 10
        },
        password: { type: "string" },
        firstname: {
            type: "string",
            minLength: 3
        },
        lastname: {
            type: "string",
            minLength: 3
        },
        username: {
            type: "string",
            minLength: 3
        },
    },
    required: ["email", "password", "firstname", "lastname", "username"],
}

const gigSchema = {
    create: {
        type: "object",
        properties: {
            gigId: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            deliveryTime: { type: "number" },
            category: {
                type: "string",
                enum: gigCategoryEnum,
                default: 'general'
            },
            tags: { type: "array" }
        },
        required: [
            "title", "description", "price",
            "deliveryTime", "category", "tags"
        ],
        additionalProperties: true
    },
    update: baseGigValidatorObject,
    read: baseGigValidatorObject,
    delete: baseGigValidatorObject,
}


const authSchema = {
    login: baseLoginObject,
    register: baseRegisterObject,
}

// validators
const gigAJV = {
    gigCreate: (data) => ajv.validate(gigSchema.create, data),
    gigRead: (data) => ajv.validate(gigSchema.read, data),
    gigUpdate: (data) => ajv.validate(gigSchema.update, data),
    gigDelete: (data) => ajv.validate(gigSchema.delete, data)
}


// auth validators
const authAJV = {
    login: (data) => ajv.validate(authSchema.login, data),
    register: (data) => ajv.validate(authSchema.register, data),
}



const handleAJVError = (res) => {

    const ajvError = ajv.errors?.map((err) => {
        return {
            key: err.instancePath.split("/")[1],
            message: err.message,
            params: err.params,
        };
    });

    return res.status(400).json({
        message: "malformed input",
        status: "failed",
        errors: ajvError
    })
}

module.exports = {
    ajv,
    gigAJV,
    authAJV,
    gigSchema,
    handleAJVError
}