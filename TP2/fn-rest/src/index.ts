import { Context, StructuredReturn } from 'faas-js-runtime';
import { Collection, Db, MongoClient, ObjectId } from 'mongodb';

/**
 * Your HTTP handling function, invoked with each request. This is an example
 * function that logs the incoming request and echoes its input to the caller.
 *
 * It can be invoked with `func invoke`
 * It can be tested with `npm test`
 *
 * It can be invoked with `func invoke`
 * It can be tested with `npm test`
 *
 * @param {Context} context a context object.
 * @param {object} context.body the request body if any
 * @param {object} context.query the query string deserialized as an object, if any
 * @param {object} context.log logging object with methods for 'info', 'warn', 'error', etc.
 * @param {object} context.headers the HTTP request headers
 * @param {string} context.method the HTTP request method
 * @param {string} context.httpVersion the HTTP protocol version
 * See: https://github.com/knative/func/blob/main/docs/guides/nodejs.md#the-context-object
 */


export const handle = async (context: Context, body: string): Promise<StructuredReturn> => {

  let response: any = { status: "error", message: "La requête n'est pas correcte" }
  const uri = "mongodb+srv://paulmirgaine:e7GC3Uzxt3gAsJgZ@cluster0.r9njsrr.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db("sample_weatherdata");
  const collection: Collection = db.collection("data");

  switch (context.method) {
    case "GET":
      response = await collection.findOne({ _id: new ObjectId(context.query?.id) })
      break
    case "POST":
      response = await collection.updateOne(JSON.parse(body), { upsert: true })
      break
    case "PUT":
      response = await collection.updateOne({ _id: new ObjectId(body["_id"]) }, JSON.parse(body))
      break
    case "DELETE":
      response = await collection.deleteOne({ _id: new ObjectId(context.query?.id) })
      break
  }
  return {
    body: JSON.stringify(response),
    headers: {
      'content-type': 'application/json'
    }
  };
};
