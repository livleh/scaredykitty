const forEach = (arr, fn) => {
  let str = '';
  arr.forEach(i => str += fn(i) || '');
  return str;
};




export function template ({ allItems, groups, errors, now }) {
  const nowmil = Date.now();
  const oneMinute = 60 * 1000;         // milliseconds in one minute
  const oneHour = oneMinute * 60;      // milliseconds in one hour
  const oneDay = oneHour * 24;         // milliseconds in one day
  const oneMonth = oneDay * 30;        // rough estimate - milliseconds in one "month" (30 days)
  const oneYear = oneDay * 365;        // rough estimate - milliseconds in one year (365 days)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="manifest" href="manifest.json">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="ScaredyKitten">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ScaredyKitten</title>
  <link rel="icon" href="icon.png">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inria+Sans">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div id="rss">
    <div>
      <article>
        <section>
        ${/*section for each group*/forEach(groups, ([groupName, feeds]) => `
          <div class="follows" id="${groupName}">
            <div class="tags">
              <ul style="margin-left:0px">
                ${groups.map((group) => {

                  let difference = nowmil - (new Date (group[1][0].items[0].isoDate)).getTime(); // difference in milliseconds

                  let dateclass = "";

                  if (difference >= oneMonth) {
                      dateclass = "age-m";
                  } else if (difference >= oneDay) {
                      dateclass = "age-d";
                  } else {
                      dateclass = "age-h";
                  }


                  return ` 
                <li class="${dateclass}"><a ${group[0] === groupName ? "class='active'" : ''} href="#${group[0]}">${group[0]}</a></li>
              `}).join('')}
              <li class="last_build">Updated </li>
              </ul>
            </div>


            
              <ol>
              ${/*feeds that can be enlarged*/feeds.map((feed) => {
                let difference = nowmil - (new Date (feed.items[0].isoDate)).getTime(); // difference in milliseconds

                let datestring = "";
                let dateclass = "";

                if (difference >= oneYear) {
                    datestring = Math.floor(difference / oneYear) + 'Y';
                    dateclass = "age-m";
                } else if (difference >= oneMonth) {
                    datestring = Math.floor(difference / oneMonth) + 'M';
                    dateclass = "age-m";
                } else if (difference >= oneDay) {
                    datestring = Math.floor(difference / oneDay) + 'd';
                    dateclass = "age-d";
                } else if (difference >= oneHour) {
                    datestring = Math.floor(difference / oneHour) + 'h';
                    dateclass = "age-h";
                } else {
                    datestring = Math.floor(difference / oneMinute) + 'm';
                    dateclass = "age-h";
                }




                return `
              <li class="${dateclass}">
                  <h3>
                      <a href="${feed.link}"> <img class="favicon" src=${"https://"+(new URL(feed.link).hostname)+"/favicon.ico"} onerror="this.onerror=null; this.src='default-favicon.ico';" width="20" height="20"></a>
                      <a class="url" target="" href=${feed.link}>${feed.title}</a>
                      <span class="latest">${datestring}</span>
                  </h3>
                  <div class="extra trunc">
                      <div class="post">
                          <ol class="title">
                          ${feed.items.slice(0, 10).map(item => {
                            let difference = nowmil - (new Date (item.isoDate)).getTime(); // difference in milliseconds

                            let datestring = "";
                            let dateclass = "";
            
                            if (difference >= oneYear) {
                                datestring = Math.floor(difference / oneYear) + 'Y';
                                dateclass = "age-m";
                            } else if (difference >= oneMonth) {
                                datestring = Math.floor(difference / oneMonth) + 'M';
                                dateclass = "age-m";
                            } else if (difference >= oneDay) {
                                datestring = Math.floor(difference / oneDay) + 'd';
                                dateclass = "age-d";
                            } else if (difference >= oneHour) {
                                datestring = Math.floor(difference / oneHour) + 'h';
                                dateclass = "age-h";
                            } else {
                                datestring = Math.floor(difference / oneMinute) + 'm';
                                dateclass = "age-h";
                            }

                            return `
                              <li class="${dateclass}">
                                  <a href="${item.link}">${item.title}</a>
                                  <span class="ago">${datestring}</span>
                              </li>
                          `}).join('')}
                          </ol>
                          
                          <a class="collapse" href=""><span class="enter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="3" x2="10" y2="9"></line><line x1="3" y1="13" x2="10" y2="7"></line></svg></span><span class="close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="0" y1="5" x2="6" y2="13"></line><line x1="10" y1="5" x2="4" y2="13"></line></svg></span></a>
                      </div>

                  </div>
      
              </li>
              `}).join('')}


              
              
            </ol>
            


                




      


            
          </div>
          `)}
        </section>
      </article>
    </div>
  </div>
  <script>

  var elements = document.getElementsByClassName("collapse");

  var toggleVisibility = function() {
      event.preventDefault();
      // Toggle the visibility of the 'enter' and 'close' spans within the clicked element
      var enterSpan = this.querySelector('.enter');
      var closeSpan = this.querySelector('.close');

      if (enterSpan.style.display === 'none') {
          enterSpan.style.display = 'inline';
          closeSpan.style.display = 'none';
      } else {
          enterSpan.style.display = 'none';
          closeSpan.style.display = 'inline';
      }
      var parentDiv = this.closest('.extra');
      if (parentDiv) {
          parentDiv.classList.toggle('trunc');
      }
  };

  for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', toggleVisibility, false);
  }


  if (!window.location.hash) {
    window.location.hash = '${groups[0][0]}';
  }



  let difference = Date.now() - ${nowmil};
  let datestring = "";
  let dateint = 0
  if (difference >= ${oneYear}) {
    dateint = Math.floor(difference / ${oneYear})
    if (dateint > 1) {
      datestring = dateint + ' years';
    }
    else {
      datestring = dateint + ' year';
    }
  } else if (difference >= ${oneMonth}) {
    dateint = Math.floor(difference / ${oneMonth})
    if (dateint > 1) {
      datestring = dateint + ' months';
    }
    else {
      datestring = dateint + ' month';
    }
  } else if (difference >= ${oneDay}) {
    dateint = Math.floor(difference / ${oneDay})
    if (dateint > 1) {
      datestring = dateint + ' days';
    }
    else {
      datestring = dateint + ' day';
    }
  } else if (difference >= ${oneHour}) {
    dateint = Math.floor(difference / ${oneHour})
    if (dateint > 1) {
      datestring = dateint + ' hours';
    }
    else {
      datestring = dateint + ' hour';
    }
  } else {
    dateint = Math.floor(difference / ${oneMinute})
    if (dateint > 1) {
      datestring = dateint + ' minutes';
    }
    else if (dateint < 1){
      datestring = '< 1 minute';
    }
    else {
      datestring = dateint + ' minute';
    }
  }
  var lastUpdatedElements = document.querySelectorAll('.last_build');
  lastUpdatedElements.forEach(function(element) {
    element.textContent = "Updated " + datestring + " ago";
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(function(err) {
                console.log('Service Worker registration failed:', err);
            });
  }
  

</script>
</body>
</html>
`};