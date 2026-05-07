const fs = require('fs');
const path = require('path');

const influencersDir = path.join(__dirname, 'Influencers');
const outputFile = path.join(__dirname, 'influencers.json');

try {
    // Read all directories in Influencers folder
    const items = fs.readdirSync(influencersDir, { withFileTypes: true });
    const influencerFolders = items.filter(item => item.isDirectory());
    
    const influencers = [];
    
    // Process each influencer folder
    for (const folder of influencerFolders) {
        const folderPath = path.join(influencersDir, folder.name);
        const files = fs.readdirSync(folderPath);
        
        // Find profile image (any jpeg/jpg/png file)
        const imageFile = files.find(file => 
            file.toLowerCase().endsWith('.jpeg') || 
            file.toLowerCase().endsWith('.jpg') || 
            file.toLowerCase().endsWith('.png')
        );
        
        // Find data txt file (any .txt file)
        const txtFile = files.find(file => file.toLowerCase().endsWith('.txt') && !file.includes('Folder Structure'));
        
        const influencer = {
            name: folder.name, // default to folder name
            username: '',
            followers: '',
            bio: '',
            link: '',
            platform: 'Instagram',
            image: imageFile ? `Influencers/${folder.name}/${imageFile}` : ''
        };
        
        // Parse data from txt file if it exists
        if (txtFile) {
            const txtPath = path.join(folderPath, txtFile);
            const content = fs.readFileSync(txtPath, 'utf-8');
            const lines = content.split('\n').map(line => line.trim()).filter(line => line);
            
            for (const line of lines) {
                const lowerLine = line.toLowerCase();
                
                if (lowerLine.startsWith('name') || lowerLine.startsWith('name :')) {
                    const parts = line.split(':');
                    if (parts.length > 1) {
                        influencer.name = parts[1].trim();
                    }
                } else if (lowerLine.startsWith('username') || lowerLine.startsWith('username :') || lowerLine.startsWith('@')) {
                    const parts = line.split(':');
                    let username = parts.length > 1 ? parts[1].trim() : line.trim();
                    username = username.replace('@', '');
                    influencer.username = username;
                } else if (lowerLine.startsWith('followers') || lowerLine.startsWith('followers :')) {
                    const parts = line.split(':');
                    if (parts.length > 1) {
                        influencer.followers = parts[1].trim();
                    }
                } else if (lowerLine.startsWith('link') || lowerLine.startsWith('link :')) {
                    const parts = line.split(':');
                    if (parts.length > 1) {
                        influencer.link = parts.slice(1).join(':').trim();
                    }
                } else if (lowerLine.startsWith('bio') || lowerLine.startsWith('bio :')) {
                    const parts = line.split(':');
                    if (parts.length > 1) {
                        influencer.bio = parts[1].trim();
                    }
                } else if (lowerLine.startsWith('promotion app') || lowerLine.startsWith('promotion app :') || lowerLine.startsWith('platform') || lowerLine.startsWith('platform :')) {
                    const parts = line.split(':');
                    if (parts.length > 1) {
                        influencer.platform = parts[1].trim();
                    }
                } else {
                    // If it's a line that's not a key-value pair, add to bio
                    if (influencer.bio) {
                        influencer.bio += ' ' + line;
                    } else {
                        influencer.bio = line;
                    }
                }
            }
            
            // If we have username but no link, build the Instagram link
            if (influencer.username && !influencer.link) {
                influencer.link = `https://www.instagram.com/${influencer.username}`;
            }
        }
        
        influencers.push(influencer);
    }
    
    // Write to influencers.json
    fs.writeFileSync(outputFile, JSON.stringify(influencers, null, 2));
    console.log('Successfully generated influencers.json with', influencers.length, 'influencers!');
    
} catch (error) {
    console.error('Error generating influencers.json:', error);
    process.exit(1);
}
