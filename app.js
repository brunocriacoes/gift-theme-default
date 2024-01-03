const _app_data = {}

async function load_data_app() {
    const _load_data = document.querySelector('[app-data]')
    if (_load_data) {
        const file_name = _load_data.getAttribute("app-data")
        const get_data = await (await fetch(file_name)).json()
        return get_data
    }
    return {}
}

function repeat(obj) {
    const _repeats = document.querySelectorAll('[app-repeat]')
    Array.from(_repeats).forEach(function ($e) {
        $e.setAttribute('hidden', '')
        let _tmp_name = $e.getAttribute("app-repeat")
        if (obj[_tmp_name]) {
            Array.from(obj[_tmp_name]).forEach(c => {
                let $copy = document.createElement($e.localName)
                if ($e.getAttribute("class")) {
                    $copy.setAttribute('class', $e.getAttribute("class"))
                }
                $copy.innerHTML = blade($e.innerHTML, c)
                $e.parentNode.append($copy)
            })
        }
    })
}

function values(obj) {
    const _repeats = document.querySelectorAll('[app-value]')
    Array.from(_repeats).forEach(function ($e) {
        $e.innerHTML = blade($e.innerHTML, obj)        
    })
}

function blade(string, dados) {
    return string.replace(/{{(.*?)}}/g, (match, p1) => {
        const chaves = p1.trim().split('.')
        let valor = dados
        for (const chave of chaves) {
            valor = valor[chave]
            if (valor === undefined) {
                return match
            }
        }
        return valor
    })
}

; (async () => {
    const data = await load_data_app()
    repeat(data)
    values(data)
})()
