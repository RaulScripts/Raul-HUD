CreateThread(function()
    while true do 
        local ped = PlayerPedId()
        if IsPedArmed(ped, 7) then
            _sleep = 100
            local weapon = GetSelectedPedWeapon(ped)
            local ammoTotal = GetAmmoInPedWeapon(ped,weapon)
            local bool,ammoClip = GetAmmoInClip(ped,weapon)
            local ammoRemaining = math.floor(ammoTotal - ammoClip)
                SendNUIMessage({
                    action = 'showAmmo',
                    cargada = ammoClip,
                    resta = ammoRemaining
                })
        else
            SendNUIMessage({
                action = 'hideAmmo',
            })
            _sleep = 1000
        end
        Wait(_sleep)
    end
end)