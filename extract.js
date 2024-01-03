const slug = window.location.href.split('/').reverse()[0]

const prods = Array.from(document.querySelectorAll('.produto_item')).map( p => {
    return {
        slug,
        img: p.querySelector('img').src,
        title: p.querySelector('strong').innerHTML
    }
})

console.log(JSON.stringify(prods))

const blob = new Blob([JSON.stringify(prods)], { type: 'text/plain' });
const a = document.createElement('a');
a.setAttribute('download', `${slug}.json`);
a.setAttribute('href', window.URL.createObjectURL(blob));
a.click();