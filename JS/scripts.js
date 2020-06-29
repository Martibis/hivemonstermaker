$(document).ready(function() {
  let currentlvl = 1;
  let maxLvls = 10;
  let totalAbilities = 0;
  let abilities = [
      {'name':'Blast','descr':'Does additional damage to Monsters adjacent to the target Monster.', 'img': 'ability_blast.png'},
      {'name':'Dodge','descr':'Has an increased chance of evading Melee or Ranged attacks.', 'img': 'ability_dodge.png'},
      {'name':'Enrage','descr':'Has increased Melee attack and Speed when damaged.', 'img': 'ability_enrage.png'},
      {'name':'Flying','descr':'Has an increased chance of evading Melee or Ranged attacks from Monsters who do not have the Flying ability.', 'img': 'ability_flying.png'},
      {'name':'Heal','descr':'Restores a portion of the Monster\'s health each round.', 'img': 'ability_heal-self.png'},
      {'name':'Tank-Heal','descr':'Restores a portion of the Monster in the first position\'s health each round.', 'img': 'ability_heal-tank.png'},
      {'name':'Inspire','descr':'Gives all friendly Monsters +1 Melee attack.', 'img': 'ability_inspire.png'},
      {'name':'Magic-Reflect','descr':'When hit with Magic damage, does reduced Magic damage back to the attacker.', 'img': 'ability_magic-reflect.png'},
      {'name':'Piercing','descr':'If Melee or Ranged attack damage is in excess of the target\'s Armor, the remainder will damage the target\'s Health.', 'img': 'ability_piercing.png'},
      {'name':'Posion','descr':'Attacks have a chance to apply poison, which does automatic damage to the target at the beginning of each round after the poison is applied.', 'img': 'ability_poison.png'},
      {'name':'Protect','descr':'All friendly Monsters gain +2 Armor.', 'img': 'ability_protect.png'},
      {'name':'Resurrect','descr':'When a friendly Monster dies it is brought back to life with 1 Health. This ability can only trigger once per battle.', 'img': 'ability_resurrect.png'},
      {'name':'Retaliate','descr':'When hit with a Melee attack, Monsters with Retaliate have a chance of attacking their attacker.', 'img': 'ability_retaliate.png'},
      {'name':'Shield','descr':'Reduced damage from Melee and Ranged attacks.', 'img': 'ability_shield.png'},
      {'name':'Slow','descr':'Reduces the Speed of all enemy Monsters.', 'img': 'ability_slow.png'},
      {'name':'Snipe','descr':'Targets enemy Monsters with Ranged, Magic, or no attack that are not in the first position.', 'img': 'ability_snipe.png'},
      {'name':'Sneak','descr':'Targets the last Monster on the enemy Team instead of the first Monster.', 'img': 'ability_stealth.png'},
      {'name':'Stun','descr':'When a Monster with Stun hits a target, it has a chance to stun the target causing it to skip its next turn.', 'img': 'ability_stun.png'},
      {'name':'Thorns','descr':'When hit with a Melee attack, does damage back to the attacker.', 'img': 'ability_thorns.png'},
      {'name':'Trample','descr':'When a Monster with Trample hits and kills its target, it will perform another attack on the next Monster on the enemy Team.', 'img': 'ability_trample.png'},
      {'name':'Void','descr':'Reduced damage from Magic attacks.', 'img': 'ability_void.png'},
      {'name':'Weaken','descr':'Reduces the Health of all enemy Monsters.', 'img': 'ability_weaken.png'},
    ]

  let name;
  let imagelink;
  let splinter;
  let rarity;
  let attacktype;
  let mana;

  let lvlarray = [];

  for(let i = 0; i < abilities.length; i++){
    $('.ability-options').append('<div class="ability-option tooltip" data-ability="' + abilities[i].name + '"><img src="IMG/abilities/' +  abilities[i].img + '"/><p>' + abilities[i].name + '</p><span class="tooltiptext">' +  abilities[i].descr + '</span></div>');
  }

  $('.ability-option').on('click', function(){
    let currentAbilityName = $(this).attr('data-ability');
    let currentAbility;
    for(let i = 0; i < abilities.length; i++){
        if(abilities[i].name == currentAbilityName){
            currentAbility = abilities[i];
        }
    }

    if(!$(this).hasClass('selected-option')){
        if(totalAbilities < 5){
            $(this).addClass('selected-option');
            $('.card-abilities').append('<div class="ability-img tooltip ' + currentAbility.name + ' "><img class="ability-img" src="/IMG/abilities/' + currentAbility.img + '"/><span class="tooltiptext">'  + currentAbility.name + ':<br>' + currentAbility.descr + '</span></div>');
            $('.lvl-summary tr:nth-child(' + (currentlvl + 1) +')').find('.lvl-abilities').append('<span class="'+ currentAbility.name + '">' + currentAbility.name + ', </span>')
            totalAbilities++;
        } else{
            alert('Max 5 abilities');
        }
    }else{
        $(this).removeClass('selected-option');
        $('.card-abilities').find('.' + currentAbility.name).remove();
        $('.lvl-summary tr:nth-child(' + (currentlvl + 1) +')').find('.lvl-abilities .' + currentAbility.name + '').remove();
        totalAbilities--;
    }
  });

  $(".name-input").on("keyup", function() {
    name = $(this).val();
    $(".name").text(name);
  });

  $(".image-input").on("keyup", function() {
    imagelink = $(this).val();
    $(".card-bg").css('background-image', 'url("'+imagelink+'")');
  });

  $(".cost-input").on("keyup", function() {
    let max = parseInt($(this).attr("max"));
    let min = parseInt($(this).attr("min"));
    mana = $(this).val();
    if (mana > max) {
      mana = max;
      $(this).val(max);
      $(".cost-value").text(mana);
    } else {
      if (mana < min) {
        mana = min;
        $(this).val(min);
        $(".cost-value").text(mana);
      } else {
        $(".cost-value").text(mana);
      }
    }
  });

  $(".att-option input").on("keyup", function() {
    updateStat(".att-option input", ".attack-value", ".attack", currentlvl, ".att-stat");
  });

  $(".speed-option input").on("keyup", function() {
    updateStat(".speed-option input", ".speed-value", ".speed", currentlvl, ".speed-stat");
  });

  $(".armor-option input").on("keyup", function() {
    updateStat(".armor-option input", ".armor-value", ".armor", currentlvl, ".armor-stat");
  });

  $(".health-option input").on("keyup", function() {
    updateStat(".health-option input", ".health-value", ".health", currentlvl, ".health-stat");
  });

  $(".splinter-option select").on("change", function() {
    splinter = $(this).val();
    cardUrl = "IMG/splinter-card/" + splinter + ".png";
    cardIcon = "IMG/splinter-icon/" + splinter + "-icon.png";
    $(".card").attr("src", cardUrl);
    $(".card-icon").attr("src", cardIcon);
  });

  $(".rarity-option select").on("change", function() {
    rarity = $(this).val();
    rarityUrl = "IMG/rarity/" + rarity + "-bg.png";
    $(".rarity").attr("src", rarityUrl);
    switch (rarity) {
      case 'common':
        maxLvls = 10;
        break;
      case 'rare':
        maxLvls = 8;
        break;
      case 'epic':
        maxLvls = 6;
        break;
      case 'legendary':
        maxLvls = 4;
        break;
    }
    $('.lvl-summary tr').show();
    $('.lvl-summary tr:nth-child(n + '+ (maxLvls + 2) +')').hide();

    $('.prev-lvl').css('visibility', 'visible');
    $('.next-lvl').css('visibility', 'visible');  
    if(currentlvl <= 1){
      $('.prev-lvl').css('visibility', 'hidden');
    }
    if(currentlvl >= maxLvls){
      $('.next-lvl').css('visibility', 'hidden');
    }
  });

  $(".attack-option select").on("change", function() {
    attacktype = $(this).val();
    attackUrl = "IMG/stats/" + attacktype + "-attack.png";
    $(".attack").attr("src", attackUrl);
  });
  
  $('.next-lvl').on('click', function(){
    $('canvas').remove();
    let att = $('.att-option input').val();
    let speed = $('.speed-option input').val();
    let armor = $('.armor-option input').val();
    let health = $('.health-option input').val();
    let lvlAbilities = [];
    $('.ability-option').each(function(){
      if($(this).hasClass('selected-option')){
        lvlAbilities.push($(this).attr('data-ability'));
      }
    });
    
    lvlarray[currentlvl] = {'lvl': currentlvl, 'att': att, 'speed': speed, 'armor': armor, 'health': health, 'abilities' : lvlAbilities };
    currentlvl++;
    $('.card-lvl').text('★ ' + currentlvl)
    switch(currentlvl) {
      case 1:
          $('.prev-lvl').css('visibility', 'hidden');
          break;
      case maxLvls:
          $('.next-lvl').css('visibility', 'hidden');
          break;
      default:
          $('.prev-lvl').css('visibility', 'visible');
          $('.next-lvl').css('visibility', 'visible');   
    }
    
    $('.current-lvl-title').text('LVL ' + currentlvl + ':')

    if(lvlarray[currentlvl]){
      $('.att-option input').val(lvlarray[currentlvl].att);
      $('.speed-option input').val(lvlarray[currentlvl].speed);
      $('.armor-option input').val(lvlarray[currentlvl].armor);
      $('.health-option input').val(lvlarray[currentlvl].health);
      $('.ability-img').remove();
      totalAbilities = 0;
      $('.ability-option').each(function(){
        $(this).removeClass('selected-option');
        let currentOption = $(this);
        let currentAbility = $(this).attr('data-ability');

        for(let i = 0; i < lvlarray[currentlvl].abilities.length; i++){
          if(lvlarray[currentlvl].abilities[i] == currentAbility){
            currentOption.click();
          }
        }
      });
    }
    $('.selected-option').addClass('temp');
    $('.selected-option').click();
    $('.temp').click();
    $('.temp').removeClass('temp');
    $("input").keyup();
    $("select").keyup();
  });


  $('.prev-lvl').on('click', function(){
    $('canvas').remove();
    let att = $('.att-option input').val();
    let speed = $('.speed-option input').val();
    let armor = $('.armor-option input').val();
    let health = $('.health-option input').val();
    let lvlAbilities = [];
    $('.ability-option').each(function(){
      if($(this).hasClass('selected-option')){
        lvlAbilities.push($(this).attr('data-ability'));
      }
    });
    
    lvlarray[currentlvl] = {'lvl': currentlvl, 'att': att, 'speed': speed, 'armor': armor, 'health': health, 'abilities' : lvlAbilities };
  
    currentlvl--;
    $('.card-lvl').text('★ ' + currentlvl)
    switch(currentlvl) {
      case 1:
          $('.prev-lvl').css('visibility', 'hidden');
          break;
      case maxLvls:
          $('.next-lvl').css('visibility', 'hidden');
          break;
      default:
          $('.prev-lvl').css('visibility', 'visible');
          $('.next-lvl').css('visibility', 'visible');
    }
    $('.current-lvl-title').text('LVL ' + currentlvl + ':')

    if(lvlarray[currentlvl]){
      $('.att-option input').val(lvlarray[currentlvl].att);
      $('.speed-option input').val(lvlarray[currentlvl].speed);
      $('.armor-option input').val(lvlarray[currentlvl].armor);
      $('.health-option input').val(lvlarray[currentlvl].health);
      $('.ability-img').remove();
      totalAbilities = 0;
      $('.ability-option').each(function(){
        $(this).removeClass('selected-option');
        let currentOption = $(this);
        let currentAbility = $(this).attr('data-ability');

        for(let i = 0; i < lvlarray[currentlvl].abilities.length; i++){
          if(lvlarray[currentlvl].abilities[i] == currentAbility){
            currentOption.click();
          }
        }
      });
    }
    $('.selected-option').addClass('temp');
    $('.selected-option').click();
    $('.temp').click();
    $('.temp').removeClass('temp');
    $("input").keyup();
    $("select").keyup();
  });

  $('.download-card').on('click', function(){
    html2canvas(document.getElementById('preview'), {allowTaint : true, useCORS : true}).then(function(canvas) {
      $('.image-maker').find('canvas').remove();
      $('.image-maker').append(canvas);
    });
  });

  $('.download-stats').on('click', function(){
    html2canvas(document.getElementById('lvl-summary')).then(function(canvas) {
      var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'allstats.jpg';
        a.click();
    });
  });

  $("input").keyup();
  $("select").keyup();
});

function updateStat(e, value, img, lvl, lvlStat){
    let max = parseInt($(e).attr("max"));
    let min = parseInt($(e).attr("min"));
    let stat = $(e).val();
    if (stat > max) {
      stat = max;
      $(e).val(max);
      $(value).text(stat);
    } else {
      if (stat < min) {
        stat = min;
        $(e).val(min);
        $(value).text(stat);
      } else {
        $(value).text(stat);
      }
    }
    if(stat == 0){
        $(value).hide();
        $(img).hide();
    } else{
        $(value).show();
        $(img).show();
    }
    $('.lvl-summary tr:nth-child(' + (lvl + 1) +')').find(lvlStat).text(stat);
}
