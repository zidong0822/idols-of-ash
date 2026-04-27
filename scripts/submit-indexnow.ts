// Using global fetch (Node.js 18+)

const KEY = '7818e8d89a424b9a89c8c8c8c8c8c8c8';
const HOST = 'idols-of-ash.org';
const URL_LIST = [
    `https://${HOST}/`,
    `https://${HOST}/about-us`,
    `https://${HOST}/privacy-policy`,
    `https://${HOST}/terms-of-service`,
    `https://${HOST}/contact-us`,
    `https://${HOST}/dmca`
];

async function submitToIndexNow() {
    console.log('Submitting URLs to IndexNow...');
    try {
        const response = await fetch('https://www.bing.com/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                host: HOST,
                key: KEY,
                keyLocation: `https://${HOST}/${KEY}.txt`,
                urlList: URL_LIST
            })
        });

        if (response.ok) {
            console.log('Successfully submitted to IndexNow');
        } else {
            const text = await response.text();
            console.error('Failed to submit to IndexNow:', response.status, text);
        }
    } catch (error) {
        console.error('Error submitting to IndexNow:', error);
    }
}

submitToIndexNow();
