const axios = require('../../utils/axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://news.kobo.com';

module.exports = async (ctx) => {
    const { data } = await axios.get(`${BASE_URL}/news-releases`);
    const $ = cheerio.load(data);

    ctx.state.data = {
        title: 'Kobo releases',
        link: `${BASE_URL}/news-releases`,
        item: $('.index-item')
            .map((_, item) => ({
                title: $(item)
                    .find('.index-item-title')
                    .text()
                    .trim(),
                pubDate: new Date(
                    $(item)
                        .find('.index-item-date')
                        .text()
                ).toUTCString(),
                link:
                    BASE_URL +
                    $(item)
                        .find('a')
                        .first()
                        .attr('href'),
                description: $(item)
                    .find('.index-item-description')
                    .html(),
            }))
            .get(),
    };
};
