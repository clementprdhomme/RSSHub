// https://lareleveetlapeste.fr/nos-articles/

const axios = require('../../utils/axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://lareleveetlapeste.fr';

module.exports = async (ctx) => {
    const { data } = await axios.get(`${BASE_URL}/enquetes`);
    const $ = cheerio.load(data);

    ctx.state.data = {
        title: 'La Relève et La Peste - Enquêtes',
        link: `${BASE_URL}/enquetes`,
        item: $('.__post')
            .map((_, item) => ({
                title:
                    $(item)
                        .find('span')
                        .eq(1)
                        .text()
                        .trim() +
                    ' - ' +
                    $(item)
                        .find('span')
                        .eq(2)
                        .text()
                        .trim(),
                link: $(item)
                    .find('a')
                    .first()
                    .attr('href'),
                description: $(item)
                    .find('span')
                    .eq(3)
                    .html(),
            }))
            .get(),
    };
};
