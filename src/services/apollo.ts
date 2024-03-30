import { ApolloClient, InMemoryCache } from "@apollo/client";
import { url } from "./api";

export const client = new ApolloClient({
    uri: url + 'now_playing',
    cache: new InMemoryCache()
})