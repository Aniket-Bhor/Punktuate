const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
    const influencersDir = path.join(process.cwd(), 'Influencers');
    
    try {
        const items = fs.readdirSync(influencersDir, { withFileTypes: true });
        const influencerFolders = items.filter(item => item.isDirectory());
        
        const influencers = [];
        
        for (const folder of influencerFolders) {
            const folderPath = path.join(influencersDir, folder.name);
            const files = fs.readdirSync(folderPath);
            
            const imageFile = files.find(file => 
                file.toLowerCase().endsWith('.jpeg') || 
                file.toLowerCase().endsWith('.jpg') || 
                file.toLowerCase().endsWith('.png')
            );
            
            const txtFile = files.find(file => file.toLowerCase().endsWith('.txt') && !file.includes('Folder Structure'));
            
            const influencer = {
                name: folder.name,
                username: '',
                followers: '',
                bio: '',
                link: '',
                platform: 'Instagram',
                image: imageFile ? `Influencers/${folder.name}/${imageFile}` : ''
            };
            
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
                        if (influencer.bio) {
                            influencer.bio += ' ' + line;
                        } else {
                            influencer.bio = line;
                        }
                    }
                }
                
                if (influencer.username && !influencer.link) {
                    influencer.link = `https://www.instagram.com/${influencer.username}`;
                }
            }
            
            influencers.push(influencer);
        }
        
        res.json(influencers);
    } catch (error) {
        console.error('Error reading influencers directory:', error);
        res.status(500).json({ error: 'Failed to load influencers' });
    }
};
