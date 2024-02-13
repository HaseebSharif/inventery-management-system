import csvParser from 'csv-parser';
import xlsx from 'xlsx';
import fs from 'fs';
import Product from "../models/productsModel.js";



// Route for file upload
export const importProducts =  async (req, res) => {
    try {
        const file = req.file;
        // console.log('sssaaaaaa' , req.file)
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        const user = req.user._id; 
        let inventoryData = [];

        if (file.mimetype === 'text/csv') {
            // Parse CSV file
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('data', (data) => {
                    data.user = user
                    inventoryData.push(data);
                })
                .on('end', async () => {
                    // Save data to database
                    await Product.insertMany(inventoryData);
                    // Delete the temporary file
                    fs.unlinkSync(file.path);
                    res.send('Data imported successfully');
                });
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Parse Excel file
            const workbook = xlsx.readFile(file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            inventoryData = xlsx.utils.sheet_to_json(sheet);

             // Include userId in each product object
             inventoryData.forEach((data) => {
                data.user = user;
            });
            // Save data to database
            await Product.insertMany(inventoryData);
            // Delete the temporary file
            fs.unlinkSync(file.path);
            res.send('Data imported successfully');
        } else {
            // Unsupported file format
            fs.unlinkSync(file.path); // Delete the temporary file
            res.status(400).send('Unsupported file format');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error importing data');
    }
};


// Route for exporting data
export const downloadData = async (req, res) => {
    try {
        const inventoryData = await Product.find(); 
        // Convert data to CSV format
        const csvData = inventoryData.map(item => ({
            Name: item.name,
            Category: item.category,
            Price: item.price,
            Description: item.description,
            Quantity: item.quantity
            // Add other fields as needed
        }));
        // Convert CSV data to CSV format
        const csv = csvData.map(row => Object.values(row).join(',')).join('\n');
        res.attachment('Product.csv').send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error exporting data');
    }
};


