RegisterCommand(Config.CommandConfig, function()
    SendNUIMessage({
        action = 'showConfig'
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback('saveColors', function(data, cb)
    ESX.ShowNotification('Colores guardados con exito')
end)

RegisterNUICallback('exit', function(data, cb)
    SetNuiFocus(false, false)
end)

local water, food = 0, 0

function ReloadData(xPlayer)
    if not loaded then loaded = true end
    for i = 1, #ESX.PlayerData.accounts, 1 do
        if ESX.PlayerData.accounts[i].name == 'money' then
            money = ESX.PlayerData.accounts[i].money
        elseif ESX.PlayerData.accounts[i].name == 'bank' then
            bank = ESX.PlayerData.accounts[i].money
        elseif ESX.PlayerData.accounts[i].name == 'black_money' then
            black = ESX.PlayerData.accounts[i].money
        elseif ESX.PlayerData.accounts[i].name == Config.VipCoin then 
            vip = ESX.PlayerData.accounts[i].money
        end
    end

    if not IsPauseMenuActive() then
        SendNUIMessage({
            action = 'UpdateMoney';
            money = money;
            bank = bank;
            black = black;
            vip = vip;
        })

        local player = PlayerPedId()
        local playerid = PlayerId()

        SendNUIMessage({
            action = 'UpdateStatus',
            health = GetEntityHealth(player) - 100,
            stamina = 100 - GetPlayerSprintStaminaRemaining(playerid),
            armour = GetPedArmour(player),
            food = food, 
            water = water,
            stress = stress,
            pid = GetPlayerServerId(PlayerId())
        })
    
        SendNUIMessage({
            action = 'UpdateJob', 
            job = ESX.PlayerData.job.label..' - '..ESX.PlayerData.job.grade_label,
        })
    else
        SendNUIMessage({
            action = 'hideAllHud'
        }) 
    end
end


RegisterNetEvent('esx:playerLoaded', function(xPlayer)
    RunMainThread(xPlayer)
end)


function RunMainThread(player)
    ReloadData(player)
    CreateThread(function() 
        while (true) do 
            ReloadData(ESX.GetPlayerData())
            Wait(600)
        end
    end)
end

RegisterNetEvent('esx_status:onTick', function(data)
    for i = 1, #data do
        if data[i].name == 'thirst' then 
            water = math.floor(data[i].percent)
        end
        if data[i].name == 'hunger' then 
            food = math.floor(data[i].percent) 
        end
    end
end)