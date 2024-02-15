window.addEventListener("message", function(event) {
    var v = event.data 
    let dollar = Intl.NumberFormat('en-US');



    switch (v.action) {

        case 'hideAllHud':
            $('.AllHud').hide()
        break;

        case 'showConfig': 
            $('.ConfigHud').fadeIn(250)
        break;

        case 'showAmmo': 
            $('.armas').show()
            $('.armas span').text(`${v.cargada} / ${v.resta}`)
        break;

        case 'hideAmmo':
            $('.armas').hide()
        break;

        case 'UpdateMoney': 
            $('.bankjs').text(dollar.format(v.bank))
            $('.moneyjs').text(dollar.format(v.money))
            $('.blackjs').text(dollar.format(v.black))
            $('.coinjs').text(dollar.format(v.vip))
        break;

        case 'UpdateStatus':
            $('.AllHud').show()
            $('.progressvida').css({'width': v.health + '%'})
            $('.progresschaleco').css({'width': v.armour + '%'})
            $('.progresscomida').css({'width': v.food + '%'})
            $('.progressagua').css({'width': v.water + '%'})
            $('.pid').html('ID '+v.pid)
        break;

        case 'UpdateJob':
            $('.trabajojs').text(v.job.toUpperCase())
        break;
    }

});



$(document).keyup((e) => {
    
    if (e.key === "Escape") {
            CloseAll()
    }
});

function CloseAll(){
    $.post('https://Raul_Hud/exit', JSON.stringify({}));
    $('.ConfigHud').fadeOut(0)
}

function saveId(item, check) {
    localStorage.setItem(item, check);
}

function GetSaveId(item) {
    return localStorage.getItem(item);
}


function LoadColors() {
    let colorVida = GetSaveId('colorVida')
    let colorChaleco = GetSaveId('colorChaleco')
    let colorComida = GetSaveId('colorComida')
    let colorAgua = GetSaveId('colorAgua')
    let colorBackground = GetSaveId('colorBackground')

    $('.colorVida').val(colorVida || '#00618b')
    $('.colorChaleco').val(colorChaleco || '#00618b')
    $('.colorComida').val(colorComida || '#00618b')
    $('.colorAgua').val(colorAgua || '#00618b')
    $('.colorBackground').val(colorBackground || 'rgba(0, 0, 0, 0.521)')

    $("*").css("--BgColor",colorBackground || 'rgba(0, 0, 0, 0.521)');
    $(".progressvida").css('background-color', colorVida || '#00618b');
    $(".progresschaleco").css('background-color', colorChaleco || '#00618b');
    $(".progresscomida").css('background-color', colorComida || '#00618b');
    $(".progressagua").css('background-color', colorAgua || '#00618b');

}


// Make load event
window.addEventListener("load", function() {
    LoadColors()
});

let colorVida, colorChaleco, colorComida, colorAgua, colorBackground

$(function(){

    $('#saveColors').click(function(){
        saveId('colorVida', colorVida || '#00618b')
        saveId('colorChaleco', colorChaleco || '#00618b')
        saveId('colorComida', colorComida || '#00618b')
        saveId('colorAgua', colorAgua || '#00618b')
        saveId('colorBackground', colorBackground || 'rgba(0, 0, 0, 0.521)')
        $.post('https://Raul_Hud/saveColors', JSON.stringify({}));
        CloseAll()

    })

    $('#resetColors').click(function(){
        $(".progressvida").css('background-color', '#00618b');
        $(".progresschaleco").css('background-color', '#00618b');
        $(".progresscomida").css('background-color', '#00618b');
        $(".progressagua").css('background-color', '#00618b');
        $("*").css("--BgColor",'rgba(0, 0, 0, 0.521)');
        $('.colorVida').val('#00618b')
        $('.colorChaleco').val('#00618b')
        $('.colorComida').val('#00618b')
        $('.colorAgua').val('#00618b')
        $('.colorBackground').val('rgba(0, 0, 0, 0.521)')
        saveId('colorVida', '#00618b')
        saveId('colorChaleco', '#00618b')
        saveId('colorComida', '#00618b')
        saveId('colorAgua', '#00618b')
        saveId('colorBackground', 'rgba(0, 0, 0, 0.521)')
    })

    $(".colorVida").on("input",(e)=>{        
        $(".progressvida").css('background-color', $(e.target).val());
        colorVida = $(e.target).val()
    });

    $(".colorChaleco").on("input",(e)=>{        
        $(".progresschaleco").css('background-color', $(e.target).val());
        colorChaleco = $(e.target).val()
    });
    

    $(".colorComida").on("input",(e)=>{        
        $(".progresscomida").css('background-color', $(e.target).val());
        colorComida = $(e.target).val()
    });

    $(".colorAgua").on("input",(e)=>{
        $(".progressagua").css('background-color', $(e.target).val());
        colorAgua = $(e.target).val()
    });

    $(".colorBackground").on("input",(e)=>{
        $("*").css("--BgColor",$(e.target).val());
        colorBackground = $(e.target).val()
    });
})