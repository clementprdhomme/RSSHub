// https://lareleveetlapeste.fr/nos-articles/

const axios = require('../../utils/axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://lareleveetlapeste.fr';

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

const getDate = (str) => {
    const split = str.split(' ');
    const day = +split[0];
    const month = MONTHS.indexOf(split[1].toLowerCase()) !== -1 ? MONTHS.indexOf(split[1].toLowerCase()) : 0;
    const year = +split[2];
    return new Date(Date.UTC(year, month, day));
};

module.exports = async (ctx) => {
    const { data } = await axios.get(`${BASE_URL}/nos-articles`);
    const $ = cheerio.load(data);

    ctx.state.data = {
        title: 'La Relève et La Peste - Articles',
        link: `${BASE_URL}/nos-articles`,
        item: $('.article-preview')
            .map((_, item) => ({
                title: $(item)
                    .find('.article-preview-title')
                    .text()
                    .trim(),
                pubDate: getDate(
                    $(item)
                        .find('.article-preview-date')
                        .text()
                ).toUTCString(),
                link: $(item)
                    .find('a')
                    .first()
                    .attr('href'),
                description: $(item)
                    .find('.article-preview-summary')
                    .html(),
            }))
            .get(),
    };
};
