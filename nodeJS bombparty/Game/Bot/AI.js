const path = require('path');
const { OpenAI } = require("langchain/llms/openai");
const { RetrievalQAChain, loadQAStuffChain } = require("langchain/chains");
const { HNSWLib } = require("langchain/vectorstores/hnswlib");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { PromptTemplate } = require("langchain/prompts");
const {JSONLoader} = require("langchain/document_loaders/fs/json");

let chain

async function initDocument() {

    const promptTemplate = `Tu es Mayaya, tu parles à la manière d'un jeune des cités de 16 ans(avec des émojis). Tes réponses ne doivent pas dépasser 300 caractères.Tu mentionne également le joueur qui te parle avec "@Player"
{context}  
{question}
Mayaya:`;
    const prompt = PromptTemplate.fromTemplate(promptTemplate);

    try {
        // Initialize the LLM to use to answer the question.
        const model = new OpenAI({ openAIApiKey: "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", modelName: "gpt-3.5-turbo-16k", temperature:1 });
        const projetPath = __dirname.split(path.sep);
        const dataPath = path.join(...projetPath.slice(0, -2), "data");
        const loader = new DirectoryLoader(dataPath, {
            ".txt": (path) => new TextLoader(path)
        });
        const docs = await loader.load();

        // Create a vector store require(the documents.
        const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: "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" }));

        // Create a chain that uses a Refine chain and HNSWLib vector store.
        chain = new RetrievalQAChain({
            combineDocumentsChain: loadQAStuffChain(model, { prompt }),
            retriever: vectorStore.asRetriever(),
        });
    }
    catch {
        console.log("Erreur embedeed")
    }  

    

}

async function initRealTime(player, message) {

    const promptTemplate = `Tu es un bot qui répond aux questions en t'aidant des données suivantes:
{context}  
{question}
Mayaya:`;
    const prompt = PromptTemplate.fromTemplate(promptTemplate);


    // Initialize the LLM to use to answer the question.
    const model = new OpenAI({ openAIApiKey: "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", modelName: "gpt-3.5-turbo", temperature:0.4 });
    const projetPath = __dirname.split(path.sep);
    const dataPath = path.join(...projetPath.slice(0, -2), "realTime");
    const loader = new DirectoryLoader(dataPath, {
        ".txt": (path) => new TextLoader(path),
        ".json": (path) => new JSONLoader(path),
    });
    const docs = await loader.load();

    // Create a vector store require(the documents.
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: "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" }));

    // Create a chain that uses a Refine chain and HNSWLib vector store.
    chain = new RetrievalQAChain({
        combineDocumentsChain: loadQAStuffChain(model, { prompt }),
        retriever: vectorStore.asRetriever(),
    });

    const question = `${player}: ${message}`
    const res = await chain.call({
        query: question
    });
    return res.text
}

async function getResponseData(player, message) {
    const question = `${player}: ${message}`
    const res = await chain.call({
        query: question
    });
    return res.text
}

module.exports = { getResponseData, initDocument, initRealTime }
