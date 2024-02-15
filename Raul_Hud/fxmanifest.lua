fx_version 'cerulean'

game 'gta5'

author 'RaulAhmed'
description 'Hud for FiveM'

shared_script '@es_extended/imports.lua'

 
client_scripts {
 'Client/*.lua'
}

shared_scripts {
    'Config.lua'
}


ui_page {
 'html/index.html', 
}

escrow_ignore {
    'Config.lua'
}

files {
 'html/index.html',
 'html/app.js', 
 'html/style.css'
} 