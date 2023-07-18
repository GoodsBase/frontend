import { faker } from '@faker-js/faker'
import fs from 'node:fs'

const { commerce } = faker

// Generate random item data
function generateItem(folderId) {
    const name = commerce.productName();
    const price = Math.floor(Math.random() * 100) + 1;
    const measurementUnit = ['кг', 'г', 'л'][Math.floor(Math.random() * 3)];
    const barcode = Math.floor(Math.random() * 10000000000).toString();

    return {
        folderId,
        name,
        price,
        measurementUnit,
        barcode
    };
}

// Generate random folder data
function generateFolder() {
    const name = commerce.department();

    return {
        folderId: null,
        itemsCount: 0,
        name
    };
}

// Generate entries
function generateEntries(count) {
    const rootItemsCount = count;
    const folders = {};
    const items = {};

    // Generate root items
    for (let i = 0; i < rootItemsCount; i++) {
        const itemId = Math.random().toString(36).slice(2);
        const item = generateItem(null);
        items[itemId] = item;
    }

    // Generate folders
    const folderIds = Object.keys(items);
    folderIds.forEach(folderId => {
        const folder = generateFolder();
        folder.itemsCount = Math.floor(Math.random() * 10) + 1;
        folders[folderId] = folder;

        // Generate items inside folders
        for (let i = 0; i < folder.itemsCount; i++) {
            const itemId = Math.random().toString(36).slice(2);
            const item = generateItem(folderId);
            items[itemId] = item;
        }
    });

    // Construct the final database object
    const database = {
        rootItemsCount,
        folders,
        items
    };

    return database;
}

// Usage example
const entryCount = 500;
const database = generateEntries(entryCount);
const databaseJson = JSON.stringify(database, null, 2);
const filename = 'database.json';
fs.writeFileSync(filename, databaseJson);

