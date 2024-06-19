/* 
    1. Napisz funkcję mapującą, która utworzy klucz(właściwość) nickname na każdej osobie w tablicy w następujący sposób:
    a) pobierze 3 pierwsze litery imienia, odwróci ich kolejność i zapisze do zmiennej
    //onazoL
    //Lozano
    b) pobierze 3 ostatnie litery nazwiska, zamieni kolejnością pierwszą i ostatnią i dołączy powstały string do poprzedniego
    c*) Zmieni wielkość liter w taki sposób, żeby powstały nick zaczynał się wielką literą i nie miał żadnych wielkich liter poza 1.
    d) Jeżeli liczba znaków w imieniu bądź nazwisku jest mniejsza niż 3, nickname będzie odpowiednio krótszy 
    e) rozważcie wszystkie skrajne przypadki, ponieważ Waszą funkcję mapującą wrzucimy do testów na platformie
    e) Have fun :)
    Na przykład:

    Dla osoby: 

    {
        firstName: 'Bartolomeo',
        lastName: 'Lozano'
    }

    powinniśmy uzyskać nickname Rabona

    Hints:
    - mając zmienną name = 'Bart'
      name.split('') => ['B', 'a', 'r', 't'] - tworzymy tablicę liter ze stringa
      ['B', 'a', 'r', 't'].join('') => 'Bart' - odwracamy ten proces
    - Na tablicy możemy użyć metody reverse()
    - Na stringach czy pojedynczych literkach możemy używać metod toLowerCase(), toUpperCase()
*/

const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
  },
  {
    firstName: "Lozanna",
    lastName: "Bartolomita",
  },
  {
    firstName: "Arek",
    lastName: "Milawicz",
  },
];

function nicknameRecomb(fName, lName) {
  const nicknameComp1 = fName
    .split("")
    .reverse()
    .slice(-3)
    .map((element, index) => {
      if (index == 0) {
        return element.toUpperCase();
      } else {
        return element.toLowerCase();
      }
    });
  const nicknameComp2 = lName.split("").slice(-3).reverse();
  const finalNickname = nicknameComp1.concat(nicknameComp2).join("");
  return finalNickname;
}

const peopleWithNickname = people.map((element) => ({
  firstName: element.firstName,
  lastName: element.lastName,
  nickName: nicknameRecomb(element.firstName, element.lastName),
}));

console.log(peopleWithNickname)

/* 
    2. 
    a) Do każdego obiektu dodaj funkcję introduceYourself, która za pomocą słówka this wyświetli w konsoli tekst powitalny.
    Oczywiście tekst powinien wyświetlić się dopiero po wywołaniu funkcji.
    Dla powyższego przykładu tekst powinien wyglądać w następujący sposób:
    "Cześć jestem Bartolomeo Lozano, ale w szkole mówią na mnie [Rabona]"
    Natomiast wywołanie funkcji: people[0].introduceYourself()

    Obiekt z przykładu powinien wyglądać w ten sposób
    {
        firstName: "Bartolomeo",
        lastName: "Lozano",
        nickname: "Rabona",
        introduceYourself: // tutaj ma się znajdować funkcja
    },

    b) za pomocą pętli forEach, wywołaj funkcję powitalną dla każdego elementu tablicy. W rezultacie na ekranie powinien
    pojawić się tekst powitalny dla każdej osoby w tablicy

    Hints:
    - nie używaj w tym zadaniu funkcji strzałkowej, ponieważ słówko this Ci nie zadziała i nie będziesz miał(a)
    dostępu do this.firstName lastName i nickname
    - postaraj się zdefiniować funkcję powitalną tylko raz (nie rób tego w pętli, ani funkcji map)
    
*/

Object.prototype.introduceyourself = function introduceyourself() {
  return `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickName}`;
};

for (i = 0; i < peopleWithNickname.length; i++) {
  console.log("dodanie", peopleWithNickname[i].introduceyourself());
}
/*
    3. 
    a) Dodaj do każdego obiektu funkcję getFavouriteColor
    b) funkcja ma przyjmować jeden parametr typu number z zakresu 1 - 30
    c) jeżeli podany parametr jest poza zakresem, powinien wyświetlić się odpowiedni komunikat
        - podałeś za małą liczbę, liczba nie może być mniejsza niż 1
        - podałeś za dużą liczbę, liczba nie może być większa niż 30
    d) w przypadku wywołania funkcji bez parametru, powinniśmy ustawić domyślną wartość na 5
    e) funkcja powinna zsumować wszystkie litery imienia, nazwiska i przezwiska, 
    odjąć od tej sumy liczbę wprowadzoną w parametrze, a następnie za pomocą działania modulo (%) względem długości tablicy kolorów
    wyznaczyć index
    f) za pomocą indexu funkcja powinna wyciągnąć odpowiedni kolor z tablicy i wyświetlić go w konsoli.

    Dla powyższego przykładu i liczby 5 wprowadzonej w parametrze, powinniśmy uzyskać wynik:
    (22 - 5) % 6 = 5
    console.log("orange")

    Hints
    - jeżeli po odjęciu parametru funkcji od sumy liter uzyskacie wartośc ujemną, możecie użyć metody z biblioteki Math, 
    Math.abs(-20), która zamieni liczbę na wartość absolutną, czyli dodatnią
    - w funkcji musicie użyć słówka this, parametru i tablicy, która jest na zewnątrz, tablica z kolorami może mieć
    dowoloną ilość kolorów
*/
Object.prototype.getFavouriteColor = function getFavouriteColor(number) {
  const colors = ["red", "green", "yellow", "blue", "pink", "orange"];
  let num = number;
  const letterCount =
    this.firstName.length + this.lastName.length + this.nickName.length;
  let clrArrIndex;
  let favoriteColor;
  if (number > 30) {
    console.log("podałeś za dużą liczbę, liczba nie może być większa niż 30");
  } else if (number < 1) {
    console.log("podałeś za małą liczbę, liczba nie może być mniejsza niż 1");
  } else if (number == null || number == undefined) {
    num = 5;
  }

  if (num >= 1 && num <= 30) {
    clrArrIndex = Math.abs(letterCount - num) % colors.length;
    favoriteColor = colors[clrArrIndex];
  }
  return favoriteColor;
};

let colorNumber = 6;

for (i = 0; i < peopleWithNickname.length; i++) {
  console.log(
    "Favorite color of",
    peopleWithNickname[i].firstName,
    peopleWithNickname[i].lastName,
    "is",
    peopleWithNickname[i].getFavouriteColor(colorNumber)
  );
}


//----------------------
//zastanawia mnie ta konstrukcja Object.prototype.funkcja itp.
//spróbuj zrobić tak, żeby stworzyć i wykonsolować obiekty z ludźmi, które będą zawierały w sobie funkcje, tak jak poniżej:
// {
//   firstName: "Bartolomeo",
//   lastName: "Lozano",
//   nickname: "Rabona",
//   introduceYourself: // tutaj ma się znajdować funkcja
//   getFavouriteColor: // jw.
// },
//----------------------

/*
    4. Napisz funkcję analogiczną do funkcji z zadania 3, ale nie dodawaj jej w obiekcie.
    a) funkcja powinna przyjąć 2 parametry (obiekt osoby i liczbę z zakresu 1 - 30)
    b) funkcja powinna wykonać dokładnie takie samo działanie jak poprzednia
    c) Za pomocą pętli for of przeiteruj po wszystkich osobach z tablicy i wyświetl ich ulubione kolory
*/


//----------------------
// funkcja poniżej przyjmuje 4 parametry zamiast dwóch, spróbuj napisać to tak, aby f-cja przyjmowała np. (person, number), w środku możesz użyć destrukturyzacji aby dobrać się do wartości obiektu
//----------------------

function getFavouriteColor2(number, firstName, lastName, nickName) {
  const colors = ["red", "green", "yellow", "blue", "pink", "orange"];
  let num = number;
  const letterCount = firstName.length + lastName.length + nickName.length;
  let clrArrIndex;
  let favoriteColor;
  if (number > 30) {
    console.log("podałeś za dużą liczbę, liczba nie może być większa niż 30");
  } else if (number < 1) {
    console.log("podałeś za małą liczbę, liczba nie może być mniejsza niż 1");
  } else if (number == null || number == undefined) {
    num = 5;
  }

  if (num >= 1 && num <= 30) {
    clrArrIndex = Math.abs(letterCount - num) % colors.length;
    favoriteColor = colors[clrArrIndex];
  }
  return favoriteColor;
}

for (i of peopleWithNickname) {
  console.log(
    "Favorite color of",
    i.firstName,
    i.lastName,
    "is",
    getFavouriteColor2(colorNumber, i.firstName, i.lastName, i.nickName)
  );
}

/*
    5. Zadanie polega na użyciu .filter() .map() .reduce w wersji łańcuchowej,
    czyli nie twórz nowych tablic w momencie wykonanie jednej z powyższych metod, połącz wykonanie ze sobą w jeden 
    "łańcuch" tzn. const wynik = arr.filter().map().reduce()
    a) Przefiltruj tablicę w taki sposób, aby zostały w niej osoby,
    których imię kończy się na literę 'a' lub 'k' 
    i nazwisko ma więcej znaków niż 6 
    i nick zawiera w sobie przynajmniej jedną literę a
    b) do powyższego warunku dodaj "furtkę" w postaci parametru isElite. Zmienna isElite powinna być obliczona
    za pomocą generatora liczb pseudolosowych Math.random(). Za pomocą tego generatora wylosujcie liczbę z zakresu 0 - 100.
    Jeżeli wartość losowej liczby będzie liczbą pierwszą lub będzie podzielna przez 3 i 5, ustawcie isElite na true, w pozostałych przypadkach
    isElite powinno być ustawione na false
    c) jeżeli zmienna isElite ma wartość true, nie bierzcie pod uwagę warunku z punktu a przy filtracji
    d) za pomocą funkcji map i for in odwróccie wartości i klucze w obiekcie, usuwając przy tym funkcje
    Przykład
    INPUT
    {
        firstName: "Bartolomeo",
        lastName: "Lozano",
        nickname: "Rabona",
        introduceYourself: '' // funkcja zamiast pustego stringa
        getFavouriteColor: '' // funkcja zamiast pustego stringa
    },
    OUTPUT
    {
        Bartolomeo: "firstName",
        Lozano: "lastName",
        Rabona: "nickname",
    },
    e) zredukuj tablicę obiektów do pojedynczego obiektu, który będzie zawierał wszystkie klucze i wartości
    wszystkich obiektów z tablicy, dzięki temu, że w punkcie d) odwrócilismy klucze z wartościami, nie będzie 
    z tym problemu :)
    *f) odtwórz z obiektu tablicę, która będzie zawierała same nicknames i 
    nazwiska, ktdjest < s i
    imię, którego chociaż jedna litera jest większa >= s
    g) posortuj tablicę alfabetycznie
*/
function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function peopleMixerFilter(element) {
  let nicknameChecker = element["nickName"]
    .split("")
//----------------------
// można użyć metody includes(), ale tak też jest ok
//----------------------
    .some((letter) => letter == "a");
  const isElite = Math.round(Math.random() * 100);
  if (
//----------------------
// można użyć metody endsWith() w tych stringach żeby sprawdzic czym się kończy string
//----------------------
    (element.firstName[element["firstName"].length - 1] == "a" ||
      element.firstName[element["firstName"].length - 1] == "k") &&
    element["lastName"].length > 6 &&
    nicknameChecker == true
  ) {
    return element;
  } else if (
    isPrime(isElite) == true ||
    (isElite % 3 === 0 && isElite % 5 === 0)
  ) {
    return element;
  }
}

function keyValueSwapper(element) {
  let newObject = {};
  for (item in element) {
    if (typeof element[item] == "function") {
      continue;
    } else {
      newObject[element[item]] = item;
    }
  }
  return newObject;
}

const peopleMixer = peopleWithNickname
  .filter(peopleMixerFilter)
  .map(keyValueSwapper)
  .reduce((acc, next) => {
    for (key in next) {
      if (typeof next[key] == "function") {
        continue;
      } else {
        acc[key] = next[key];
      }
    }
    return acc;
  }, {});

console.log(peopleMixer);

/*
    *6. Currying function
    a) Napisz taką funkcję mnożącą 2 liczby, aby możliwe były następujące wywołania:
    - multi(5)(6)
    - const multiplyBySix = sum(6)
      multiplyBySix(10)
    b) Analogicznie napisz funkcję, która mnoży 4 liczby i możliwe jest wywołanie
    - multi(4)(5)(6)(10)

    Hints:
    - funkcja może zwracać inne funkcje
    - funkcja może korzystać ze zmiennych i parametrów funkcji zewnętrznych (czyli tych w których się znajduje)
*/

function multi1(n1) {
  return function (n2) {
    return n1 * n2;
  };
}

console.log(multi1(5)(6));
const multiplyBySix = multi1(6);
console.log(multiplyBySix(10));

function multi2(n1) {
  return function (n2) {
    return function (n3) {
      return function (n4) {
        return n1 * n2 * n3 * n4;
      };
    };
  };
}

console.log(multi2(4)(5)(6)(10));

/*
    **7. Rekurencja
     a) Mając zagnieżdżony obiekt, wyciągnij z niego wszystkie imiona i dodaj do tablicy
     ***b) Jeżeli osoba ma więcej niż jedno imię, te imiona powinny znajdować się w jednym stringu w tablicy
     Na przykład 'Kamil Bartek'
    INPUT:
*/
const nestedObject = {
  name: "Kamil",
  children: [
    {
      name: "Zosia",
    },
    {
      name: "Krysia",
      name2: "Barbara",
      children: [
        {
          name: "Basia",
          children: [
            {
              name: "Monika",
              name2: "Viola",
              children: [
                {
                  name: "Mateusz",
                },
                {
                  name: "Sebastian",
                  name2: "August",
                  name3: "Franciszek",
                  children: [
                    { name: "Alex" },
                    { name: "Stasio" },
                    {
                      name: "Paulina",
                      children: [{ name: "Kuba" }, { name: "Kacper" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function arrayNoChildCheck(array) {
  if (
    array.every((element) => {
      if (typeof element.children !== "object") {
        return true;
      } else {
        return false;
      }
    }) == true
  ) {
    return true;
  } else {
    return false;
  }
}

function objectNoChildCheck(object) {
  if (typeof object.children !== "object") {
    return true;
  } else {
    return false;
  }
}

function childrenRecursive(object) {
  const newArray = [];
  let fullName;
  let filterChildren;
  let filterParentName;
  let filterNonParentName;
  if (arrayNoChildCheck(object["children"]) == true) {
    fullName = undefined;
    fullName = object["children"].map((element) => {
      return Object.values(element).join(" ");
    }, "");
    newArray.push(...fullName);
    return newArray;
  }
  filterChildren = object["children"].filter((element) => {
    if (objectNoChildCheck(element) == false) {
      return element.children;
    }
  });
  filterNonParentName = object["children"]
    .filter((element) => {
      if (objectNoChildCheck(element) == true) {
        return element;
      }
    })
    .map((element) => {
      return Object.values(element).join(" ");
    });
  filterParentName = filterChildren.map((element) => {
    return Object.values(element)
      .filter((value) => typeof value !== "object")
      .join(" ");
  });
  newArray.push(...filterParentName);
  newArray.push(...filterNonParentName);
  return newArray.concat(childrenRecursive(...filterChildren));
}

function fullObjectRecursive(object) {
  const FirstParent = [
    Object.values(object)
      .filter((value) => typeof value !== "object")
      .join(" "),
  ];
  const childrenNames = childrenRecursive(object);
  return FirstParent.concat(childrenNames);
}

const newRecursedArray = fullObjectRecursive(nestedObject);
console.log(newRecursedArray);
