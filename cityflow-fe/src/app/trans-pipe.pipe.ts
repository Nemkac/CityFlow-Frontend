import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transPipe',
  standalone: true
})
export class TransPipePipe implements PipeTransform {

  transform(value: string): string {
    // report malfunction
    if(localStorage.getItem('lang') == 'srb') {
    switch(value) {
      case 'Malfunction report':
        return 'Пријава квара'
        break;
      case 'Please rate the priority of malfunction resolving':
        return 'Процените озбиљност квара који је уследио :'
        break;
      case 'Selected priority:' :
        return 'Одабрана процена озбиљности :'
      case 'Describe what happened':
        return 'Објасните шта се десило'
      case 'Report' :
        return 'Пријавите'
        // rankings
      case 'Bus service rankings' :
        return 'Рангирање међу аутобусима'
        break;
      case 'Bus: ':
        return 'Аутобус: '
        break;
      case 'Bus line:':
        return 'Аутобуска линија:'
        break;
      case 'Manufacturer:':
        return 'Произвођач:'
        break;
      case 'Score:':
        return 'Скор:'
        break;
      case 'Rank:':
        return 'Ранг:'
        break;
      case 'Move up':
        return 'Померите горе'
        break;
      case 'Move down':
        return 'Померите доле'
        break;
      case 'Add svailable service time slot:':
        return 'Додајте слободан термин за сервис'
        break;
      case 'Add Time Slot':
        return 'Додајте термин'
      // servisiranja  
      case 'Bus servicings':
        return 'Термини сервисирања аутобуса'
        break;
      case 'Please check if all past servicings actually performed.':
        return 'Молимо, проверите да ли су се претходни сервиси заправо и извршили.'
        break;
      case 'If not, please select such servicing and click on it again to confirm.':
        return 'Ако неки није, првим кликом га означите, а потом другим потврдите његову неверодостојност.'
        break;
      case 'Past Servicings':
        return 'Претходни сервиси'
        break;
      case 'Bus ID':
        return 'Ид. ознака аутобуса'
        break;
      case 'Date':
        return 'Датум'
        break;
      case 'Mileage':
        return 'Километража'
        break;
      case 'Reg.num':
        return 'Рег. ознака'
        break;
      case 'Manufacturer':
        return 'Произвођач'
        break;
      case 'Model':
        return 'Модел'
        break;
      case 'Model Year':
        return 'Год. производње'
        break;
      case 'Upcoming Servicings':
        return 'Предстојећи сервиси'
        break;
      case 'Click again to confirm':
        return 'Кликните поново да бисте потврдили'
        break;
      // malfunction data
      case 'Malfunction report history':
        return 'Извештај о броју кварова на аутобусима'
        break;
      case 'In Last Month':
        return 'У претходних месец дана'
        break;
      case 'In Last Year':
        return 'У претходних годину дана'
        break;
      case 'In Last Five Years':
        return 'У протеклих пет година'
        break;
      case 'Ever':
        return 'Икада'
        break;
      // genetic
      case 'Genetic algorithm is generating charging plan.':
        return 'Генетски алгоритам генерише план пуњења.'
        break;
      case 'This can take up to 10 seconds...':
        return 'Ово може потрајати до 10 секунди...'
        break;
      case 'Charging plan results':
        return 'Резултати плана пуњења'
        break;
      case 'Station ID':
        return 'Ид.ознака станице'
        break;
      case 'Charging Time':
        return 'Време пуњења (минути)'
        break;
      case 'Start Time':
        return 'Почетак пуњења'
        break;
      case 'End Time':
        return 'Крај пуњења'
        break;
      case 'Regenerate Charging Plan':
        return 'Регенериши план пуњења'
        break;
      // super admin
      case 'ID':
        return 'ИД. ознака'
        break;
      case 'Username':
        return 'Корисничко име'
        break;
      case 'Name':
        return 'Име'
        break;
      case 'Last Name':
        return 'Презиме'
        break;
      case 'Role':
        return 'Улога'
        break;
      case 'Email':
        return 'Имејл'
        break;
      case 'Phone number':
        return 'Мобилни'
        break;
      // home page
      case 'Hello':
        return 'Здраво,'
        break;
      case 'Safety Procedures you need to take after experiencing malfunction':
        return 'Безбедносне мере које треба да предузмете након квара.'
        break;
      case 'Safely bring the bus to a complete stop at a secure location, preferably off the road.':
        return 'Безбедно зауставите аутобус на сигурном месту, по могућству ван пута.'
        break;
      case 'Activate the hazard lights to warn surrounding traffic of the situation.':
        return 'Активирајте четири жмигавца како бисте упозорили околни саобраћај на ситуацију.'
        break;
      case 'Ensure the safety and calm of all passengers, keeping them seated if possible.':
        return 'Обезбедите сигурност и смиреност свих путника, држећи их, ако је могуће, на својим местима.'
        break;
      case 'Turn off the engine to prevent further complications and inspect the bus for any visible issues.':
        return 'Искључите мотор како бисте спречили додатне компликације и прегледајте аутобус због могућих видљивих проблема.'
        break;
      case 'Report the malfunction immediately to the operations center using your communication device.':
        return 'Одмах пријавите квар оперативном центру користећи ваше комуникационо средство.'
        break;
      case 'If necessary, follow evacuation procedures to safely disembark passengers in a controlled manner.':
        return 'Ако је потребно, следите процедуре евакуације како бисте безбедно извршили искрцавање путника на контролисан начин.'
        break;
      case 'After receiving clearance, ensure that all systems are secure before resuming the journey or waiting for assistance.':
        return 'Након добијања дозволе, уверите се да су сви системи сигурни пре него што наставите путовање или сачекате помоћ.'
        break;
      case 'Await further instructions from the control center before taking additional actions.':
        return 'Чекајте даље инструкције од контролног центра пре него што предузмете додатне акције.'
        break;
      case 'Something about bus ranking system':
        return 'Нешто о систему рангирања аутобуса при њиховом сервисирању'
        break;
      case 'Each bus in our fleet is assigned a priority ranking based on a comprehensive evaluation system. This ranking is determined by multiple parameters, including total mileage, age of the vehicle, the year of manufacture, its operational significance within the fleet, the time elapsed since its last service, and the number and severity of reported malfunctions.':
        return 'Сваком аутобусу у нашој флоти додељен је приоритетни ранг на основу свеобухватног система процене. Овај ранг се одређује на основу више параметара, укључујући укупну километражу, старост возила, годину производње, оперативну важност у оквиру флоте, време које је прошло од последњег сервиса, као и број и озбиљност пријављених кварова.'
        break;
      case 'Our ranking algorithm is designed to ensure that buses requiring urgent attention are prioritized for maintenance. By incorporating these critical factors, we aim to maximize the fleet’s efficiency and reliability, minimizing downtime and ensuring optimal performance.':
        return 'Наш алгоритам рангирања је дизајниран да осигура да аутобуси који захтевају хитну пажњу буду приоритетни за одржавање. Укључивањем ових критичних фактора, тежимо максимализацији ефикасности и поузданости флоте, минимизирајући време неприступачности и осигуравајући оптималан рад.'
        break;
      case 'As a bus servicer, your responsibility is to ensure that maintenance tasks are carried out promptly and in accordance with the ranking system, preserving the operational integrity of our transport services.':
        return 'Као техничар за одржавање аутобуса, ваша одговорност је да осигурате да се задаци одржавања обављају благовремено и у складу са системом рангирања, очувајући оперативну интегритет наших превозних услуга.'
        break;
      case 'You have full controll, so if you want to move bus up or down in rankings, you can do that with a press of a buttion.':
        return 'Имате потпуну контролу, тако да ако желите да померите аутобус горе или доле у рангу, можете то учинити једним кликом на дугме.'
        break;
      case 'With adding a service time slot, you are assigning a first bus in the ranking system to that service.':
        return 'Додавањем времена за сервисирање додељујете први аутобус у систему рангирања том сервису.'
        break;
      case 'You can view servicings, past or upcoming, in the Bus servicings page, where you can also report if some bus haven`t been services but is statet otherwise.':
        return 'Можете прегледати сервисирања, било да су прошла или предстојећа, на страници „Сервисирање аутобуса“, где такође можете пријавити ако неки аутобус није био сервисиран, али је приказан као да јесте.'
        break;
      case 'Something about charging plan optimization':
        return 'Нешто о оптимизацији плана пуњења'
        break;
      case 'Our charging plan is generated through the use of an advanced genetic algorithm, meticulously designed to optimize energy distribution across the fleet. The objective is to ensure that each bus is sufficiently charged for its daily route, without overcharging and thereby wasting resources.':
        return 'Наш план пуњења се генерише коришћењем напредног генетског алгоритма, пажљиво дизајнираног да оптимизује расподелу енергије у целој флоти. Циљ је осигурати да је сваки аутобус довољно напуњен за своју дневну руту, без прекомерног пуњења и тиме расипања ресурса.'
        break;
      case 'The algorithm takes into account numerous factors such as the bus`s operational schedule, current battery levels, and projected energy needs. This ensures that all buses are adequately prepared for service, reducing both the risk of underperformance and unnecessary charging.':
        return 'Алгоритам узима у обзир бројне факторе као што су оперативни распоред аутобуса, тренутни нивои батерије и предвиђене потребе за енергијом. Ово осигурава да су сви аутобуси адекватно припремљени за службу, смањујући ризик од смањене изводљивости и непотребног пуњења.'
        break;
      case 'If operational conditions change, you may initiate a recalculation of the charging plan by selecting the "Regenerate Charging Plan" option. This action will prompt the system to take into account any recent changes, ensuring the most accurate and efficient charging scenario.':
        return 'Ако се оперативни услови промене, можете покренути поновно израчунавање плана пуњења тако што ћете изабрати опцију „Регенириши план пуњења“. Ова акција ће натерати систем да узме у обзир све недавне промене, осигуравајући најтачнији и најефикаснији сценарио пуњења.'
        break;
      case 'As a Super Admin, you hold the highest level of access and authority within the system, enabling you to manage user roles and oversee the system’s functionality with full control.':
        return 'Као врховни администратор, имате највиши ниво приступа и овлашћења у систему, што вам омогућава да управљате улогама корисника и надгледате функционалност система са пуном контролом.'
        break;
      case 'What You Can Do':
        return 'Шта можете да радите'
        break;
      case 'View All Users':
        return 'Прегледати листу свих корисника'
        break;
      case 'Modify User Roles':
        return 'Meњати улоге корисника'
        break;
      case 'By clicking on a user’s assigned role, you can easily change or update their permissions. This can include adding, removing, or altering their roles to ensure that they have the correct level of access needed for their tasks.':
        return 'Кликом на додељену улогу корисника можете лако променити или ажурирати њихова овлашћења. Ово може укључивати додавање, уклањање или измену њихових улога како бисте осигурали да имају исправан ниво приступа потребан за њихове задатке.'
        break;
      case 'You are entrusted with maintaining the system’s user role hierarchy, and through your careful management, the system can operate efficiently and securely.':
        return 'Дато Вам је поуздање за одржавање хијерархије улога корисника у систему, и кроз ваше пажљиво управљање, систем може функционисати ефикасно и сигурно.'
        break;
      case 'You have the ability to view a complete list of all registered users in the system. This allows you to monitor user activity, verify access levels, and ensure that all users are operating within the correct role parameters.':
        return 'Имате могућност да прегледате комплетну листу свих регистрованих корисника у систему. Ово вам омогућава да пратите активност корисника, проверите нивое приступа и осигурате да сви корисници функционишу у оквиру исправних параметара улоге.'
        break; 
      // side panel - profile
      case 'Profile':
        return 'Профил'
        break;
      case 'Bus rankings':
        return 'Рангирање'
        break;
      case 'Bus servicings ':
        return 'Сервисирања'
        break;
      case 'Malfunction ':
        return 'Историја'
        break;
        case 'Malfunction':
          return 'Пријави квар'
          break;
      case 'history':
        return 'кварова';
        break;
      case 'Charging plan':
        return 'План пуњења'
        break;
      case 'Manage users':
        return 'Корисници'
        break;
      case 'Sign out':
        return 'Излогујте се'
        break;
      // profile
      case 'First Name':
        return 'Име'
        break;
      case 'Date of Birth':
        return 'Датум рођења'
        break;
      case 'Password':
        return 'Шифра'
        break;
      case 'Confirm password':
        return 'Потврдите шифру'
      break;
      case 'Save Changes':
        return 'Сачувајте измене'
        break;
      case 'English':
        return 'Српски'
        break;
      case 'List of users' :
        return 'Списак корисника'
        break;
      case 'Sign Up':
        return 'Пријавите се'
        break;
      case 'Sign In':
        return 'Пријавите се'
        break;
      case 'Enter your username':
        return 'Унесите корисничко име'
        break;
      case 'Enter your password':
        return 'Унесите одговарајућу шифру'
        break;
      case 'Enter your phone number':
        return 'Унесите број мобилног телефона'
        break;
      case 'Enter new passoword':
        return 'Унесите нову шифру'
        break;
      case 'Re-enter your new password':
        return 'Потврдите вашу нову шифру'
        break;
      case 'Learn about landmarks and search routes or stops based on the attractions you would like to see':
        return 'Сазнајте више о знаменитостима и претражујте руте или станице на основу атракција које желите да видите';
        break;
      case 'Landmarks':
        return 'Атракције'
        break;
      case 'Landmark':
        return 'Атракција'
        break;
      case 'Landmarks Output':
        return 'Пронађене атракције'
        break;
      case 'City':
        return 'Град'
        break;
      case 'Region':
        return 'Регион'
        break;
      case 'Number of Citizens':
        return 'Број становника'
        break;
      case 'Check for answer':
        return 'Пронађи одговор'
        break;
      case 'Routes Output':
        return 'Пронађене руте'
        break;
        case 'Routes':
          return 'Руте'
          break;
      case 'Route':
        return 'Рута'
        break;
      case 'Description':
        return 'Опис'
        break;
      case 'Duration':
        return 'Трајање вожње'
        break;
      case 'Bus line':
        return 'Аутобуска линија'
        break;
      case 'Learn more about landmarks':
        return 'Научите о атракцијама'
        break;
      case 'Stops':
        return 'Станице'
        break;
      case 'Stop':
        return 'Станица'
        break;
      case 'Where would you like your bus to stop':
        return 'Где бисте желели да Ваш аутобус стане'
        break;
      case 'Stops Output':
        return 'Пронађене станице'
        break;
      case 'Special Features':
        return 'Знаменитости'
        break;
      case 'Nearby landmarks':
        return 'Ближње атракције'
        break;
      case 'Facilities':
        return 'Услуге'
        break;
      case 'Any preferred attractions':
        return 'Неке жељене дестинације'
        break;
      case 'Sign Up ':
        return 'Учланите се'
      case 'Don`t have an account':
        return 'Немате налог'
      case 'Bus driver':
        return 'Возач аутобуса'
        break;
      case 'Bus servicer':
        return 'Сервисер аутобуса'
        break;
      case 'Bus charging admin':
        return 'Надзорник пуњења'
        break;
      case 'Super admin':
        return 'Врховни админ'
        break;
        
      
      
      
      
      
      
            
      
      

    
      







      case 'CityFlow 2024. All rights reserved.':
        return 'CityFlow 2024. Сва права су задржана.'
        break;
      case 'This content is the property of CityFlow and is protected under international copyright laws. Unauthorized reproduction, distribution, or modification of any part of this material, in whole or in part, without express written permission of CityFlow, is strictly prohibited. All trademarks, logos, and images are the property of their respective owners. For commercial use, explicit authorization is required. Violators may be subject to legal action.':
        return 'Овај садржај је власништво CityFlow-а и заштићен је међународним законима о ауторским правима. Неовлашћено умножавање, дистрибуција или модификација било ког дела овог материјала, у целости или делимично, без изричите писмене дозволе CityFlow-а, строго је забрањена. Сви заштитни знаци, логотипи и слике су власништво њихових одговарајућих власника. За комерцијалну употребу је неопходна експлицитна ауторизација. Прекршиоци могу бити предмет правних мера.'
        break;
      default :
        return '';
        break;
    }
  } else {
    return value;
  }



    }
  }


