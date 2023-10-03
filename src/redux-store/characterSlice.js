import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import md5 from "md5";

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
// Calculate the timestamp and generate a hash
const ts = new Date().getTime();
const hash = md5(`${ts}${privateKey}${publicKey}`);

// Define the URL for the Marvel API
const baseUrl = `https://gateway.marvel.com/v1/public/characters`;

export const fetchAllCharacters = createAsyncThunk(
    "fetch-all-characters",
    async ({ offset, pageSize, searchTerm }) => {
        const response = await axios
            .get(baseUrl, {
                params: {
                    ts: ts,
                    apikey: publicKey,
                    hash: hash,
                    limit: pageSize, // Number of characters per page
                    offset: offset, // Offset based on the current page
                    nameStartsWith: searchTerm || undefined, // Filter by name (if searchTerm is provided)
                },
            })
            .catch((error) => {
                console.error(error);
            });
            console.log(response.data.data)
        return response.data.data;
    }
);

export const fetchCharacter = createAsyncThunk(
    "fetch-character",
    async ({ id }) => {
        const apiUri = baseUrl + "/" + id;
        const response = await axios
            .get(apiUri, {
                params: {
                    apikey: publicKey,
                    ts: ts,
                    hash: hash,
                },
            })
            .catch((error) => {
                console.error(error);
            });
        return response.data.data.results;
    }
);

const characterSlice = createSlice({
    name: "character",
    initialState: {
        data: [],
        characterData: {},
        fetchStatus: "",
        fetchAllStatus: "",
        totalPages:0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCharacters.fulfilled, (state, action) => {
                state.data = action.payload.results;
                state.totalPages = Math.ceil(action.payload.total  / 20)
                state.fetchAllStatus = "success";
            })
            .addCase(fetchAllCharacters.pending, (state) => {
                state.fetchAllStatus = "loading";
            })
            .addCase(fetchAllCharacters.rejected, (state) => {
                state.fetchAllStatus = "failed";
            })
            .addCase(fetchCharacter.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchCharacter.fulfilled, (state, action) => {
                state.characterData = action.payload;
                state.fetchStatus = "success";
            })
            .addCase(fetchCharacter.rejected, (state) => {
                state.fetchStatus = "failed";
            });
    },
});

export default characterSlice;
