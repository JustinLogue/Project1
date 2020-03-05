function rules(){
    var rulesReady = document.querySelector('.rules');
    rulesReady.style.display = 'block';
    var startEnd = document.querySelector('.start');
    startEnd.style.display = 'none';
}

function start(){
    var rulesReady = document.querySelector('.rules');
    rulesReady.style.display = 'none';
    document.querySelector('.pmp').textContent = (`${player.mp}/100`);
    document.querySelector('.php').textContent = (`${player.hp}/100`);
    document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
    document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
    var movesReady = document.querySelector('.movement');
    movesReady.style.display = 'flex';
    var duelReady = document.querySelector('.duel');
    duelReady.style.display ='flex';
    var helpReady = document.querySelector('.help');
    helpReady.style.display ='block';
    document.querySelector('.distance').textContent =(`${distance} ft. away.`);
}

var player ={
    hp: 100,
    shield: false,
    spellDamage: 0,
    mp: 100,
    spell: "",
    win: false,
    lose: false,

}

var foe ={
    hp:100,
    spellDamage: 0,
    mp: 100,
    spell: "",
    spellchoice: 0,
}

const spell ={
    
    shield: {
        minDistance:0,
        maxDistance: 1000,
        mpCost: 10,
        Cast: function() {
            player.spell = "Shield";
            player.spellDamage = 0;
            player.shield = true;
            player.mp = player.mp - spell.shield.mpCost;
            console.log(player.mp);
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/X9jLedt4qDC9jO2dtC/giphy.gif" alt="Player casting the shield spell." class="plainImg">`);
            var snd0 = new Audio('./assets/shield.wav');
            snd0.play();
        }
    },

    charge: {
        mpCost: 10,
        minDistance: 30,
        maxDistance: 1000,
        Cast: function(){
            player.spell = "Furious Charge";
            player.shield =false;
            distance = distance -30;
                if(distance< 0){
                    distance = 0;
                    document.querySelector('pmove').textContent =(`You bumped into your foe.`);
                    document.querySelector('fmove').textContent =(`Your foe bumped int you.`);
                }
                document.querySelector('.distance').textContent =(`${distance} ft way.`);
                player.mp = player.mp - spell.charge.mpCost;
                document.querySelector('.playerSpell').textContent = ("");
                document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
                document.querySelector('.pmp').textContent = (`${player.mp}/100`);
                document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/7MKEI162nZDcQ/giphy.gif" alt="Player casting the charge spell." class="plainImg">`);
                var snd1 = new Audio('./assets/charging.wav');
                snd1.play();
        }
    },

    shadow : {
        mpCost: 15,
        minDistance: 0,
        maxDistance: 1000,
        Cast: function(){
            player.spell = "Shadow Retreat";
            player.shield =false;
            distance = distance + 20;
            document.querySelector('.distance').textContent =(`${distance} ft way.`);
            player.mp = player.mp - spell.shadow.mpCost;
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/Rh4omHBSQl0n2rqa3B/giphy.gif" alt="Player casting the shadow retreat spell" class="plainImg">`);
            var snd2 = new Audio('./assets/shadow.mp3');
            snd2.play();
        }
    },

    mediate:{
        mpCost:0,
        minDistance:0,
        maxDistance: 1000,
        Cast: function(){
            player.spell = "Arcane Meditation";
            player.shelid = false;
            player.mp = player.mp + 25;
            console.log(player.mp);
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/ZCf2AZ9iorcdK4s4kn/giphy.gif" alt="Player casting the mediation spell" class="plainImg">`);
            var snd3 = new Audio('./assets/Ohm.wav');
            snd3.play();
        }

    },

    lesserRestore:{
        mpCost:25,
        minDistance:0,
        maxDistance: 1000,
        Cast: function(){
            player.spell = "Arcane Mediation";
            player.shelid = false;
            player.hp = player.hp + 15;
            player.mp = player.mp - spell.lesserRestore.mpCost;
            console.log(player.mp);
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/3og0IvqGRVwW4tITQs/giphy.gif" alt="Player casting the healing spell" class="plainImg">`);
            var snd4 = new Audio('./assets/heal.wav');
            snd4.play();
        }

    },

    phantasmaSword: {
        mpCost: 25,
        minDistance: 0,
        maxDistance: 10,
        Cast: function(){
            player.spell = "Phantasmic Sword";
            if(distance < spell.phantasmaSword.minDistance || distance > spell.phantasmaSword.maxDistance){
                player.spellDamage = 0;
                document.querySelector('.pmiss').textContent = (`You missed!`)
            }
            else{
                player.spellDamage =(Math.floor(Math.random() * 20)+20);
            }
            player.shield= false;
            foe.hp= foe.hp - player.spellDamage;
            player.mp = player.mp - spell.phantasmaSword.mpCost;
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/Q65pJmdDj8GidNybtW/giphy.gif"" alt="Player casting the sword spell" class="hFlipImg">`);
            var snd5 = new Audio('./assets/sword.wav');
            snd5.play();
        }
    },

    fireblast: {
        mpCost: 20,
        minDistance: 0,
        maxDistance: 30,
        Cast: function(){
            player.spell = "Fire Blast";
            if(distance < spell.fireblast.minDistance || distance > spell.fireblast.maxDistance){
                player.spellDamage = 0;
                document.querySelector('.pmiss').textContent = (`You missed!`)
            }
            else{
               player.spellDamage =(Math.floor(Math.random() * 10)+15);
            }
            console.log(player.spellDamage);
            player.shield= false;
            player.mp = player.mp - spell.fireblast.mpCost;
            foe.hp = foe.hp - player.spellDamage;
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/fLybyEva0iTUWV9T3u/giphy.gif" alt="Player casting the fireblast spell" class="plainImg">`);
            var snd6 = new Audio('./assets/fire.wav');
            snd6.play();
        }
    },
    
    earthWave:{
        mpCost: 25,
        minDistance: 20,
        maxDistance: 60,
        Cast: function(){
        player.spell = "Earth Wave";
        if(distance < spell.earthWave.minDistance || distance > spell.earthWave.maxDistance){
            player.spellDamage = 0;
            document.querySelector('.pmiss').textContent = (`You missed!`)
        }
        else{
            player.spellDamage =(Math.floor(Math.random() * 10)+5);
        }
            console.log(player.spellDamage);
            player.shield= false;
            player.mp = player.mp - spell.earthWave.mpCost;
            foe.hp = foe.hp - player.spellDamage;
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/SIuoHZbiImOxG/giphy.gif" alt="Player casting the Earth Wave spell" class="plainImg">`);
            var snd7 = new Audio('./assets/earth.wav');
            snd7.play();
        }
    },
    
    lightningStrike: {
        mpCost: 35,
        minDistance: 50,
        maxDistance: 80,
        Cast: function(){
        player.spell = "Lightning Strike";
        if(distance < spell.phantasmaSword.minDistance || distance > spell.phantasmaSword.maxDistance){
            player.spellDamage = 0;
            document.querySelector('.pmiss').textContent = (`You missed!`)
        }
        else{
            player.spellDamage =(Math.floor(Math.random() * 20)+20);
        }
            player.shield= false;
            player.mp = player.mp - spell.lightningStrike.mpCost;
            foe.hp = foe.hp - player.spellDamage;
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://thumbs.gfycat.com/ZestyBlushingKudu-max-1mb.gif" alt="Foe casting the Lightning spell" class="Rotate315Img">`);
            var snd8 = new Audio('./assets/lightning.wav');
            snd8.play();
        }
    },
    
    hailStorm: {
        mpCost: 30,
        minDistance: 75,
        maxDistance: 100,
        Cast: function(){
            player.spell = "Hail Storm";
            if(distance < spell.hailStorm.minDistance || distance > spell.hailStorm.maxDistance){
                player.spellDamage = 0;
                document.querySelector('.pmiss').textContent = (`You missed!`)
            }
            else{
                player.spellDamage =(Math.floor(Math.random() * 20)+10);
            }
            player.shield= false;
            player.mp = player.mp - spell.hailStorm.mpCost;
            foe.hp = foe.hp - player.spellDamage;
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/nnZVYuJt9JAYw/giphy.gif" alt="Foe casting the hail spell" class="Rotate270Img">`);   
            var snd9 = new Audio('./assets/ice.wav');
            snd9.play();
        },
    },
    
    starfall:{
        mpCost: 50,
        minDistance: 100,
        maxDistance: 1000,
        Cast: function(){
            player.spell = "Starfall";
            if(distance < spell.starfall.minDistance || distance > spell.starfall.maxDistance){
                player.spellDamage = 0;
                document.querySelector('.pmiss').textContent = (`You missed!`)
            }
            else{
                player.spellDamage =(Math.floor(Math.random() * 5)+15);
            }
            player.shield= false;
            player.mp = player.mp - spell.starfall.mpCost;
            foe.hp = foe.hp - player.spellDamage;
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/Wn6J454K7KewVQ1BZu/giphy.gif" alt="Player casting the starfall spell" class="plainImg">`);
            var snd10 = new Audio('./assets/star.wav');
            snd10.play();
        
        },
    

    },
    
    magicMissile:{
        mpCost: 40,
        minDistance: 0,
        maxDistance: 1000,
        Cast: function(){
            player.spell = "Magic Missile";
            player.spellDamage =(Math.floor(Math.random() * 5)+5);
            player.shield= false;
            player.mp = player.mp - spell.magicMissile.mpCost;
            foe.hp = foe.hp - player.spellDamage;
            document.querySelector('.pmp').textContent = (`${player.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.pLastSpell').textContent = (`You cast: ${player.spell}`);
            document.querySelector('.playerSpell').textContent = ("");
            document.querySelector('.playerSpell').innerHTML = (`<img src="https://media.giphy.com/media/ii7FX9KHUZE7wU3I5W/giphy.gif" alt="Player casting the magic missile spell" class="Rotate90Img">`);
            var snd11 = new Audio('./assets/magic.wav');
            snd11.play();
            
        },
    

    
    }

}

const spellFoe ={

    mediate:{
        mpCost:0,
        minDistance:0,
        maxDistance: 1000,
        Cast: function(){
            foe.spell = "Arcane Mediation";
            foe.mp = foe.mp + 25;
            console.log(foe.mp);
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/ZCf2AZ9iorcdK4s4kn/giphy.gif" alt="Foe casting the mediation spell" class="plainImg">`);
            var snd3 = new Audio('./assets/Ohm.wav');
            snd3.play();
        }

    },
    lesserRestore:{
        mpCost:25,
        minDistance:0,
        maxDistance: 1000,
        Cast: function(){
            foe.spell ="Lesser Restoration";
            foe.hp = foe.hp + 15;
            foe.mp = foe.mp - spellFoe.lesserRestore.mpCost;
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/3og0IvqGRVwW4tITQs/giphy.gif" alt="Foe casting the healing spell" class="plainImg">`);
            var snd4 = new Audio('./assets/heal.wav');
            snd4.play();
        }

    },
    charge: {
        mpCost: 0,
    },
    phantasmaSword: {
        mpCost: 25,
        minDistance: 0,
        maxDistance: 10,
        Cast: function(){
            foe.spell = "Phantasmic Sword";
            if(player.shield === true){
                foe.spellDamage = 0;
                document.querySelector('.shielded').textContent = (`You blocked their spell!`);
            }
            else{
                if(distance < spellFoe.phantasmaSword.minDistance || distance > spellFoe.phantasmaSword.maxDistance)
                {
                    document.querySelector('.miss').textContent = (`Your foe missed!`);
                    foe.spellDamage = 0;
                }
                else{
                    foe.spellDamage =(Math.floor(Math.random() * 20)+20);
                    document.querySelector('.shielded').textContent = ('');
                }
            }
            foe.mp = foe.mp - spellFoe.phantasmaSword.mpCost;
            player.hp = player.hp - foe.spellDamage;
            if(player.hp <= 0){
                playerLose();
            }
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/Q65pJmdDj8GidNybtW/giphy.gif"" alt="Foe casting the sword spell" class="plainImg">`);
            var snd5 = new Audio('./assets/sword.wav');
            snd5.play();
        }
    
    },
    fireblast: {

        mpCost: 20,
        minDistance: 0,
        maxDistance: 30,
        Cast: function(){
            foe.spell = "Fire Blast";
            if(player.shield === true){
                foe.spellDamage = 0;
                document.querySelector('.shielded').textContent = (`You blocked their spell!`);
            }
            else{
                if(distance < spellFoe.fireblast.minDistance || distance > spellFoe.fireblast.maxDistance)
                {
                    document.querySelector('.miss').textContent = (`Your foe missed!`);
                    foe.spellDamage = 0;
                }
                else{
                    foe.spellDamage =(Math.floor(Math.random() * 10)+15);
                    document.querySelector('.shielded').textContent = ('');
                }
                
            }
            foe.mp = foe.mp - spellFoe.fireblast.mpCost;
            player.hp = player.hp - foe.spellDamage;
            if(player.hp <= 0){
                playerLose();
            }
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/fLybyEva0iTUWV9T3u/giphy.gif" alt="Foe casting the fireblast spell" class="hFlipImg"">`);
            var snd6 = new Audio('./assets/fire.wav');
            snd6.play();

        }
    
    },
    earthWave:{

        mpCost: 25,
        minDistance: 20,
        maxDistance: 60,
        Cast: function(){
            foe.spell = "Earth Wave";
            if(player.shield === true){
                foe.spellDamage = 0;
                document.querySelector('.shielded').textContent = (`You blocked their spell!`);
            }
            else{
                if(distance < spellFoe.earthWave.minDistance || distance > spellFoe.earthWave.maxDistance)
                {
                    document.querySelector('.miss').textContent = (`Your foe missed!`);
                    foe.spellDamage = 0;
                }
                else{
                    foe.spellDamage =(Math.floor(Math.random() * 10)+5);
                    document.querySelector('.shielded').textContent = ('');
                }
            }
            foe.mp = foe.mp - spellFoe.earthWave.mpCost;
            player.hp = player.hp - foe.spellDamage;
            if(player.hp <= 0){
                playerLose();
            }
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/SIuoHZbiImOxG/giphy.gif" alt="Foe casting the Earth Wave spell" class="hFlipImg"">`);
            var snd7 = new Audio('./assets/earth.wav');
            snd7.play();
        }
    
    },
    lightningStrike: {
        mpCost: 35,
        minDistance: 50,
        maxDistance: 80,
        Cast: function(){
            foe.spell = "Lightning Strike";
            if(player.shield === true){
                foe.spellDamage = 0;
                document.querySelector('.shielded').textContent = (`You blocked their spell!`);
            }
            else{
                if(distance < spellFoe.lightningStrike.minDistance || distance > spellFoe.lightningStrike.maxDistance)
                {
                    document.querySelector('.miss').textContent = (`Your foe missed!`);
                    foe.spellDamage = 0;
                }
                else{
                    foe.spellDamage =(Math.floor(Math.random() * 20)+20);
                    document.querySelector('.shielded').textContent = ('');
                }
            }
            foe.mp = foe.mp - spellFoe.lightningStrike.mpCost;
            player.hp = player.hp - foe.spellDamage;
            if(player.hp <= 0){
                playerLose();
            }
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://thumbs.gfycat.com/ZestyBlushingKudu-max-1mb.gif" alt="Foe casting the Lightning spell" class="Rotate135Img">`);
            var snd8 = new Audio('./assets/lightning.wav');
            snd8.play();

        }
    
    },
    apexSmite: {
        mpCost: 65,
        minDistance: 0,
        maxDistance: 1000,
        Cast: function(){
            foe.spell = "Apex Smite";
            if(player.shield === true){
                foe.spellDamage = 0;
                document.querySelector('.shielded').textContent = (`You blocked their spell!`);
            }
            else{
                foe.spellDamage = 80;
                document.querySelector('.shielded').textContent = (``);
            }
            foe.mp = foe.mp - spellFoe.apexSmite.mpCost;
            player.hp = player.hp - foe.spellDamage;
            if(player.hp <= 0){
                playerLose();
            }
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/KDIw82hHE76IehQFq4/giphy.gif" alt="Foe casting the Apex smite spell" class="plainImg">`);
            var snd12 = new Audio('./assets/smite.wav');
            snd12.play();
            
        }
    
    },
    hailStorm: {
        mpCost: 30,
        minDistance: 75,
        maxDistance: 100,
        Cast: function(){
            foe.spell = "Hail Storm";
            if(player.shield === true){
                foe.spellDamage = 0;
                document.querySelector('.shielded').textContent = (`You blocked their spell!`);
            }
            else{
                if(distance < spellFoe.phantasmaSword.minDistance || distance > spellFoe.phantasmaSword.maxDistance)
                {
                    document.querySelector('.miss').textContent = (`Your foe missed!`);
                    foe.spellDamage = 0;
                }
                else{
                    foe.spellDamage =(Math.floor(Math.random() * 20)+10);
                    document.querySelector('.shielded').textContent = ('');
                }
            }
            foe.mp = foe.mp - spellFoe.lightningStrike.mpCost;
            player.hp = player.hp - foe.spellDamage;
            if(player.hp <= 0){
                playerLose();
            }
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/nnZVYuJt9JAYw/giphy.gif" alt="Foe casting the hail spell" class="Rotate90Img">`);
            var snd9 = new Audio('./assets/ice.wav');
            snd9.play();
        }

    
    },
    starfall: {      
        mpCost: 50,
        minDistance: 100,
        maxDistance: 1000,
        Cast: function(){
            foe.spell = "Starfall";
            if(player.shield === true){
                foe.spellDamage = 0;
                document.querySelector('.shielded').textContent = (`You blocked their spell!`);
            }
            else{
                foe.spellDamage =(Math.floor(Math.random() * 5)+15);
                document.querySelector('.shielded').textContent = (``);
            }
            foe.mp = foe.mp - spellFoe.starfall.mpCost;
            player.hp = player.hp - foe.spellDamage;
            if(player.hp <= 0){
                playerLose();
            }
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/Wn6J454K7KewVQ1BZu/giphy.gif" alt="Foe casting the starfall spell" class="plainImg">`); 
        }
    },
    magicmissile:{      
        mpCost: 40,
        minDistance: 0,
        maxDistance: 1000,
        Cast: function(){
            foe.spell = "Magic Missile";
            if(player.shield === true){
                foe.spellDamage = 0;
                document.querySelector('.shielded').textContent = (`You blocked their spell!`);
            }
            else{
                foe.spellDamage =(Math.floor(Math.random() * 5) + 5);
                document.querySelector('.shielded').textContent = (``);
            }
            foe.mp = foe.mp - spellFoe.magicmissile.mpCost;
            player.hp = player.hp - foe.spellDamage;
            if(player.hp <= 0){
                playerLose();
            }
            console.log(foe.hp)
            document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
            document.querySelector('.php').textContent = (`${player.hp}/100`);
            document.querySelector('.fLastSpell').textContent = (`Foe cast: ${foe.spell}`);
            document.querySelector('.foeSpell').textContent = ("");
            document.querySelector('.foeSpell').innerHTML = (`<img src="https://media.giphy.com/media/ii7FX9KHUZE7wU3I5W/giphy.gif" alt="Foe casting the magic missile spell" class="Rotate270Img">`);
            var snd11 = new Audio('./assets/magic.wav');
            snd11.play();
        }
    },

};

const shl   = document.querySelector('.shield');
const med   = document.querySelector('.mediate');
const heal  = document.querySelector('.heal')
const phS   = document.querySelector('.sword');
const fire  = document.querySelector('.fire');
const earth = document.querySelector('.earth');
const light = document.querySelector('.lightning');
const hail  = document.querySelector('.hail');
const star  = document.querySelector('.star');
const missile = document.querySelector('.missile');
const chr   = document.querySelector('.charge');
const back  = document.querySelector('.back');

shl.addEventListener('click', function(evt)
{
    if(player.mp >= spell.shield.mpCost){
    spell.shield.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';


    }
    else{alert("You don't have enough mana to cast this spell!")}

    console.log(player.shield)

    
});

heal.addEventListener('click', function(evt)
{
    console.log('click test, heal');
    if(player.mp >= spell.lesserRestore.mpCost){
    spell.lesserRestore.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(player.hp <= 0){
        playerLose();
    }

    }
    else{alert("You don't have enough mana to cast this spell!")}

    console.log(player.shield)

    
});

med.addEventListener('click', function(evt)
{
    console.log('click test, mediate');
    spell.mediate.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(player.hp <= 0){
        playerLose();
    }
    

    
});

phS.addEventListener('click', function(evt)
{
    console.log('click test, P.Sword');
    if(player.mp >= spell.phantasmaSword.mpCost){
    spell.phantasmaSword.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(foe.hp <= 0){
        playerWin();
    }
    if(player.hp <= 0){
        playerLose();
    }
    }
    else{alert("You don't have enough mana to cast this spell!")}

    

    
});

fire.addEventListener('click', function(evt)
{
    console.log('click test, F.blast');
    if(player.mp >= spell.fireblast.mpCost){
    spell.fireblast.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(foe.hp <= 0){
        playerWin();
    }
    if(player.hp <= 0){
        playerLose();
    }
    }
    else{alert("You don't have enough mana to cast this spell!")}

    console.log(player.shield)

    
});

earth.addEventListener('click', function(evt)
{
    console.log('click test, E.wave');
    if(player.mp >= spell.earthWave.mpCost){
    spell.earthWave.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(foe.hp <= 0){
        playerWin();
    }
    if(player.hp <= 0){
        playerLose();
    }
    }
    else{alert("You don't have enough mana to cast this spell!")}

    console.log(player.shield)

    
});

light.addEventListener('click', function(evt)
{
    console.log('click test, F.blast');
    if(player.mp >= spell.lightningStrike.mpCost){
    // sheild.Cast();
    spell.lightningStrike.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(foe.hp <= 0){
        playerWin();
    }
    if(player.hp <= 0){
        playerLose();
    }
    }
    else{alert("You don't have enough mana to cast this spell!")}

    console.log(player.shield)

    
});

hail.addEventListener('click', function(evt)
{
    if(player.mp >= spell.hailStorm.mpCost){
    spell.hailStorm.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(foe.hp <= 0){
        playerWin();
    }
    if(player.hp <= 0){
        playerLose();
    }
    }
    else{alert("You don't have enough mana to cast this spell!")}

    console.log(player.shield)
});

star.addEventListener('click', function(evt)
{
    if(player.mp >= spell.starfall.mpCost){
    spell.starfall.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(foe.hp <= 0){
        playerWin();
    }
    if(player.hp <= 0){
        playerLose();
    }
    }
    else{alert("You don't have enough mana to cast this spell!")}

    console.log(player.shield)
});

missile.addEventListener('click', function(evt)
{
    if(player.mp >= spell.magicMissile.mpCost){
    spell.magicMissile.Cast();
    foeSpell();
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'none';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'flex';
    if(foe.hp <= 0){
        playerWin();
    }
    if(player.hp <= 0){
        playerLose();
    }
    }
    else{alert("You don't have enough mana to cast this spell!")};

    console.log(player.shield)
});

chr.addEventListener('click', function(evt){
    if(player.mp >= spell.charge.mpCost){
        spell.charge.Cast();
        foeSpell();
        var spellsReady = document.querySelector('.spells');
        spellsReady.style.display = 'none';
        var movePicked = document.querySelector('.movement');
        movePicked.style.display = 'flex';
        if(player.hp <= 0){
            playerLose();
        }
        }
        else{alert("You don't have enough mana to cast this spell!")};
});

back.addEventListener('click', function(evt){
    if(player.mp >= spell.shadow.mpCost){
        spell.shadow.Cast();
        foeSpell();
        var spellsReady = document.querySelector('.spells');
        spellsReady.style.display = 'none';
        var movePicked = document.querySelector('.movement');
        movePicked.style.display = 'flex';
        if(player.hp <= 0){
            playerLose();
        }
        }
        else{alert("You don't have enough mana to cast this spell!")};
})

function foeSpell(){
    console.log (foe.spellchoice)
    if (foe.spellchoice === 1){
        spellFoe.mediate.Cast();
    }
    else if (foe.spellchoice === 2){
        spellFoe.lesserRestore.Cast();
    }
    else if (foe.spellchoice === 3){
        spellFoe.apexSmite.Cast();
    }
    else if (foe.spellchoice === 4){
        spellFoe.magicmissile.Cast();
    }
    else if (foe.spellchoice === 5){
        spellFoe.phantasmaSword.Cast();
    }
    else if (foe.spellchoice === 6){
        spellFoe.fireblast.Cast();
    }
    else if (foe.spellchoice === 7){
        spellFoe.earthWave.Cast();
    }
    else if (foe.spellchoice === 8){
        spellFoe.lightningStrike.Cast();
    }
    else if (foe.spellchoice === 9){
        spellFoe.hailStorm.Cast();
    }
}

function replay(){
    player.hp = 100;
    player.mp = 100;
    player.shield = false;
    player.spell= "",
    player.win= false,
    player.lose= false,
    foe.hp =100;
    foe.mp =100;
    foe.spellchoice = 0;
    distance = 50;
    document.querySelector('.distance').textContent =(`${distance} ft. away.`);
    document.querySelector('.fmp').textContent = (`${foe.mp}/100`);
    document.querySelector('.fhp').textContent = (`${foe.hp}/100`);
    document.querySelector('.pmp').textContent = (`${player.mp}/100`);
    document.querySelector('.php').textContent = (`${player.hp}/100`);
    var moveTable = document.querySelector('.movement');
    moveTable.style.display = "flex";
    var replayButton = document.querySelector('.replay');
    replayButton.style.display = "none";
    document.querySelector('.gameOver').textContent = "";
    document.querySelector('.fLastSpell').textContent ="";
    document.querySelector('.pLastSpell').textContent ="";
    document.querySelector('.playerAvatar').innerHTML = ("");
    document.querySelector('.playerAvatar').innerHTML = (`<img src="https://media.giphy.com/media/29NDhZxIz8nTy/giphy.gif" alt="Your Wizard avatar" height="250" width="200">`);
    document.querySelector('.foeAvatar').innerHTML = ("");
    document.querySelector('.foeAvatar').innerHTML = (`<img src="https://media.giphy.com/media/VFzysZPJqNRPq/giphy.gif" alt="You Foe's avatar" height="250" width="200">`);
    document.querySelector('.playerSpell').textContent = ("");
    document.querySelector('.foeSpell').textContent = ("");
    document.querySelector('.pmove').textContent =("");
    document.querySelector('.fmove').textContent =("");
    document.querySelector('.fdescription').textContent =("");


}

function playerLose(){
    player.lose = true;
    var replayButton = document.querySelector('.replay');
    var spellTable = document.querySelector('.spells');
    var moveTable = document.querySelector('.movement');
    moveTable.style.display = "none"
    spellTable.style.display = "none"
    replayButton.style.display = "block";
    document.querySelector('.gameOver').innerHTML = ("");
    document.querySelector('.gameOver').innerHTML = (`<h4>You Lose!</h4>`);
    document.querySelector('.playerAvatar').innerHTML = ("");
    document.querySelector('.playerAvatar').innerHTML = (`<img src="https://media.giphy.com/media/jVcn9BpVIAi3ct2FuX/giphy.gif" alt="You died!" class="plainImg">`);
    foe.hp =100;
    foe.mp =100;
}

function playerWin(){
    player.win = true;
    var replayButton = document.querySelector('.replay');
    var spellTable = document.querySelector('.spells');
    var moveTable = document.querySelector('.movement');
    moveTable.style.display = "none"
    spellTable.style.display = "none"
    replayButton.style.display = "block";
    document.querySelector('.gameOver').innerHTML = (`<h5>You Win!</h5>`);
    document.querySelector('.foeAvatar').innerHTML = ("");
    document.querySelector('.foeAvatar').innerHTML = (`<img src="https://media.giphy.com/media/jVcn9BpVIAi3ct2FuX/giphy.gif" alt="They died!" class="hFlipImg">`);
    player.hp =100;
    player.mp =100;

}

function help(){
    var helpbtn =document.querySelector('.help');
    var guideBox= document.querySelector('.guide');
    guideBox.style.display ="block";
    helpbtn.style.display ="none";
}

function helpAway(){
    var guideBox= document.querySelector('.guide');
    guideBox.style.display ="none";
    var helpbtn =document.querySelector('.help');
    helpbtn.style.display ="block";
}


var distance = 50;

const b15 = document.querySelector('.back15');
const b10 = document.querySelector('.back10');
const b5  = document.querySelector('.back5');
const h0  = document.querySelector('.hold');
const f5  = document.querySelector('.forward5');
const f10 = document.querySelector('.forward10');
const f15 = document.querySelector('.forward15');

function foeMovement(){
    document.querySelector('.fLastSpell').textContent = ("");
    document.querySelector('.pLastSpell').textContent = ("");
    document.querySelector('.miss').textContent = ("");
    document.querySelector('.pmiss').textContent = ("");
    document.querySelector('.shielded').textContent = ("");
    if (distance > 100){
        distance = distance -10;
        document.querySelector('.fmove').textContent = (`Foe moved forward 10 ft.`);
        }
    else if (distance < 10){
        distance = distance + 10;
        document.querySelector('.fmove').textContent = (`Foe moved back 10 ft.`);
        
    }
    else{
        var foeMovePick = (Math.floor(Math.random() * 3)+1);
        if(foeMovePick === 1){
            distance = distance -10;
            document.querySelector('.fmove').textContent = (`Foe moved forward 10 ft.`);
        }
        else if(foeMovePick === 2){
            document.querySelector('.fmove').textContent = (`Foe stayed in place.`)
        }
        else if(foeMovePick === 3){
            distance = distance + 10;
            document.querySelector('.fmove').textContent = (`Foe moved back 10 ft.`);
        }
    }
}

function foeSpellPick(){
    console.log("spell pick test")
    foe.spellchoice = 0;
    
    if(foe.mp < 15){
        foe.spellchoice = 1;
        document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
        
    }
    else{
        while(foe.spellchoice === 0){
            if(distance <= 10 && distance >= 0 ){
                foe.spellchoice = (Math.floor(Math.random() * 6)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                    foe.spellchoice =2;
                    document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                    foe.spellchoice =3;
                    document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 5){
                    if(foe.mp > spellFoe.phantasmaSword.mpCost){
                        foe.spellchoice =5;
                        document.querySelector('.fdescription').textContent = ("Your foe gains an orange scabbard...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 6){
                    if(foe.mp > spellFoe.fireblast.mpCost){
                        foe.spellchoice =6;
                        document.querySelector('.fdescription').textContent = ("Cinders shed from your foe's hands...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }

            }
            else if(distance === 15){
                foe.spellchoice = (Math.floor(Math.random() * 5)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                        foe.spellchoice =2;
                        document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                        foe.spellchoice =3;
                        document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 5){
                    if(foe.mp > spellFoe.fireblast.mpCost){
                        foe.spellchoice =6;
                        document.querySelector('.fdescription').textContent = ("Cinders shed from your foe's hands...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }

            }
            else if(distance >= 20 && distance <= 30){
                foe.spellchoice = (Math.floor(Math.random() * 6)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                        foe.spellchoice =2;
                        document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");

                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                        foe.spellchoice =3;
                        document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 5){
                    if(foe.mp > spellFoe.fireblast.mpCost){
                        foe.spellchoice =6;
                        document.querySelector('.fdescription').textContent = ("Cinders shed from your foe's hands...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 6){
                    if(foe.mp > spellFoe.earthWave.mpCost){
                        foe.spellchoice =7;
                        document.querySelector('.fdescription').textContent = ("The ground quakes behind your foe...");

                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
            }
            else if(distance >= 35 && distance <= 45){
                foe.spellchoice = (Math.floor(Math.random() * 5)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                        foe.spellchoice =2;
                        document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                        foe.spellchoice =3;
                        document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 5){
                    if(foe.mp > spellFoe.earthWave.mpCost){
                        foe.spellchoice =7;
                        document.querySelector('.fdescription').textContent = ("The ground quakes behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                
            }
            else if(distance >= 50 && distance <= 60){
                foe.spellchoice = (Math.floor(Math.random() * 6)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                        foe.spellchoice =2;
                        document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                        foe.spellchoice =3;
                        document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 5){
                    if(foe.mp > spellFoe.earthWave.mpCost){
                        foe.spellchoice =7;
                        document.querySelector('.fdescription').textContent = ("The ground quakes behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 6){
                    if(foe.mp > spellFoe.lightningStrike.mpCost){
                        foe.spellchoice =8;
                        document.querySelector('.fdescription').textContent = ("Sparks shake off of your foe's temples");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
            }
            else if(distance >= 65 && distance <= 70){
                foe.spellchoice = (Math.floor(Math.random() * 5)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                        foe.spellchoice =2;
                        document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                        foe.spellchoice =3;
                        document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 5){
                    if(foe.mp > spellFoe.lightningStrike.mpCost){
                        foe.spellchoice =8;
                        document.querySelector('.fdescription').textContent = ("Sparks shake off of your foe's temples");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
            }
            else if(distance === 75){
                foe.spellchoice = (Math.floor(Math.random() * 6)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                        foe.spellchoice =2;
                        document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                        foe.spellchoice =3;
                        document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 5){
                    if(foe.mp > spellFoe.lightningStrike.mpCost){
                        foe.spellchoice =8;
                        document.querySelector('.fdescription').textContent = ("Sparks shake off of your foe's temples");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 6){
                    if(foe.mp > spellFoe.hailStorm.mpCost){
                        foe.spellchoice =9;
                        document.querySelector('.fdescription').textContent = ("Your foe exhales a cold mist...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
            }
            else if(distance >= 80 && distance <= 100){
                foe.spellchoice = (Math.floor(Math.random() * 5)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                        foe.spellchoice =2;
                        document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                        foe.spellchoice =3;
                        document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 5){
                    if(foe.mp > spellFoe.hailStorm.mpCost){
                        foe.spellchoice =9;
                        document.querySelector('.fdescription').textContent = ("Your foe exhales a cold mist...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
            }
            else if(distance > 100){
                foe.spellchoice = (Math.floor(Math.random() * 4)+1);
                if(foe.spellchoice === 1){
                    foe.spellchoice = 1;
                    document.querySelector('.fdescription').textContent = ("Your foe's breathe becomes slow and delibrate...");
                }
                else if(foe.spellchoice === 2 ){
                    if(foe.mp > spellFoe.lesserRestore.mpCost){
                        foe.spellchoice =2;
                        document.querySelector('.fdescription').textContent = ("Green bubbles flow off your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 3){
                    if(foe.mp > spellFoe.apexSmite.mpCost){
                        foe.spellchoice =3;
                        document.querySelector('.fdescription').textContent = ("Your foe's eyes turn ink black...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
                else if(foe.spellchoice === 4){
                    if(foe.mp > spellFoe.magicmissile.mpCost){
                        foe.spellchoice =4;
                        document.querySelector('.fdescription').textContent = ("Pink spheres appear behind your foe...");
                    }
                    else{
                        foe.spellchoice = 0;
                    }
                }
            }
        }
    }
}

b15.addEventListener('click', function(evt){
    document.querySelector('.playerSpell').textContent = ("");
    document.querySelector('.foeSpell').textContent = ("");
    foeMovement();
    foeSpellPick();
    distance = distance + 15;
    document.querySelector('.pmove').textContent = (`You moved back 15 ft.`);
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'flex';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'none';
    document.querySelector('.distance').textContent = (`${distance} ft. way.`);
    console.log (foe.spellchoice);
});
b10.addEventListener('click', function(evt){
    document.querySelector('.playerSpell').textContent = ("");
    document.querySelector('.foeSpell').textContent = ("");
    foeMovement();
    foeSpellPick();
    distance = distance + 10;
    document.querySelector('.pmove').textContent = (`You moved back 10 ft.`);
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'flex';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'none';
    document.querySelector('.distance').textContent = (`${distance} ft. way.`);
});
b5.addEventListener('click', function(evt){
    document.querySelector('.playerSpell').textContent = ("");
    document.querySelector('.foeSpell').textContent = ("");
    foeMovement();
    foeSpellPick();
    distance = distance + 5;
    document.querySelector('.pmove').textContent = (`You moved back 5 ft.`);
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'flex';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'none';
    document.querySelector('.distance').textContent = (`${distance} ft. way.`);
});
h0.addEventListener('click', function(evt){
    document.querySelector('.playerSpell').textContent = ("");
    document.querySelector('.foeSpell').textContent = ("");
    foeMovement();
    foeSpellPick();
    if (distance < 0){
        distance =0;
        document.querySelector('.pmove').textContent = (`You and your foe bumped into eachother`);
    }
    else{
        document.querySelector('.pmove').textContent = (`You stood your ground.`);
    }
    
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'flex';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'none';
    document.querySelector('.distance').textContent = (`${distance} ft. way.`);
});
f5.addEventListener('click', function(evt){
    document.querySelector('.playerSpell').textContent = ("");
    document.querySelector('.foeSpell').textContent = ("");
    foeMovement();
    foeSpellPick();
    distance = distance - 5;
    if (distance < 0){
        distance =0;
        document.querySelector('.pmove').textContent = (`You and your foe bumped into each other`);
    }
    else{
        
        document.querySelector('.pmove').textContent = (`You moved forward 5 ft.`);
    }
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'flex';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'none';
    document.querySelector('.distance').textContent = (`${distance} ft. way.`);
});
f10.addEventListener('click', function(evt){
    document.querySelector('.playerSpell').textContent = ("");
    document.querySelector('.foeSpell').textContent = ("");
    foeMovement();
    foeSpellPick();
    distance = distance - 10;
    if (distance < 0){
        distance =0;
        document.querySelector('.pmove').textContent = (`You and your foe bumped into each other`);
    }
    else{
        
        document.querySelector('.pmove').textContent = (`You moved forward 10 ft.`);
    }
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'flex';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'none';
    document.querySelector('.distance').textContent = (`${distance} ft. way.`);
});
f15.addEventListener('click', function(evt){
    document.querySelector('.playerSpell').textContent = ("");
    document.querySelector('.foeSpell').textContent = ("");
    foeMovement();
    foeSpellPick();
    distance = distance - 15;
    if (distance < 0){
        distance =0;
        document.querySelector('.pmove').textContent = (`You and your foe bumped into each other`);
    }
    else{
        
        document.querySelector('.pmove').textContent = (`You moved forward 15 ft.`);
    }
    var spellsReady = document.querySelector('.spells');
    spellsReady.style.display = 'flex';
    var movePicked = document.querySelector('.movement');
    movePicked.style.display = 'none';
    document.querySelector('.distance').textContent = (`${distance} ft. way.`);
});

$(function(){
    $('.Dyslexic1').on('click', function(){
        $('body').toggleClass('Dyslexic2')
    });
});



