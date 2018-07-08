


        var string = window.atob(
            "V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjMwLjAwMApEaXNjbGFpbWVycwoKMDA6MDA6MzAuMDAwIC0tPiAwMDowMToyOC4wMDAKUHJvZ3JhbSBTdGFydAoKMDA6MDE6MjguMDAwIC0tPiAwMDowMjowNy4wMDAKSW50cm9kdWN0aW9uCgowMDowMjowNy4wMDAgLS0+IDAwOjAzOjQ5LjAwMApBbmF0b215IG9mIFByZWduYW5jeQoKMDA6MDM6NDkuMDAwIC0tPiAwMDowODoyMi4wMDAKUHJlLUxhYm9yIFNpZ25zCgowMDowODoyMi4wMDAgLS0+IDAwOjEwOjUxLjAwMApPbnNldCBvZiBMYWJvcgoKMDA6MTA6NTEuMDAwIC0tPiAwMDoxMTo1Ny4wMDAKTGFib3IgT3ZlcnZpZXcKCjAwOjExOjU3LjAwMCAtLT4gMDA6MTU6MzcuMDAwCkZpcnN0IFN0YWdlCgowMDoxNTozNy4wMDAgLS0+IDAwOjIwOjAyLjAwMApBY3RpdmUgTGFib3IKCjAwOjIwOjAyLjAwMCAtLT4gMDA6MjI6NDcuMDAwClRyYW5zaXRpb24KCjAwOjIyOjQ3LjAwMCAtLT4gMDA6Mjg6NTcuMDAwClNlY29uZCBTdGFnZQoKMDA6Mjg6NTcuMDAwIC0tPiAwMDozMTowOC4wMDAKVGhpcmQgU3RhZ2UKCjAwOjMxOjA4LjAwMCAtLT4gMDA6MzU6MDIuMDAwCkZvdXJ0aCBTdGFnZQoKMDA6MzU6MDIuMDAwIC0tPiAwMDozNzoxMS4yMDAKQ3JlZGl0cwoKMDA6Mzc6MTEuMjAwIC0tPiAwMDozODoxMS4yMDAKQ29udGFjdCBJbmZvcm1hdGlvbg=="
        );

        //functional parser for selecting times and converting the times into seconds
        secondsArr = [];
        function timesToSeconds(str) {
            var newTime;
            var seconds;
            var time = str.match(/^\d*:\d*:\d*/gm);
            for (var i = 0; i < time.length; i++) {
                newTime = time[i].split(":");
                seconds = newTime[0] * 3600 + newTime[1] * 60 + newTime[2] * 1;
                secondsArr.push(seconds);
            }
        }

        timesToSeconds(string);


        //creates an anchor tag inside of a list tag for each number of seconds, and sets content inside of anchor href attribute, and parses chapter titles into the anchor tags   

        function getTimesAndChapters(str) {
            var ul = document.createElement("ul");
            ul.setAttribute("id", "chapterList"); 
            var contents, list, anchor;
            var chapterArray;
            secondsArr.splice(0, 1);
            console.log(secondsArr);
            chapterArray = str.split(/[\n]+/).toString();
            chapterArray = chapterArray.match(/\b[a-zA-Z- ]+\b/gm);
            if (chapterArray.includes("WEBVTT")) {
                chapterArray.shift();
            }
            if (chapterArray.includes("Disclaimers")) {
                chapterArray.shift();
            }
            console.log(chapterArray);
            for (var x = 0; x < secondsArr.length; x++) {
                contents = "#video" + "-" + secondsArr[x] + "-";
                list = document.createElement("li");
                anchor = document.createElement("a");
                anchor.href = contents;
                anchor.innerHTML = chapterArray[x];
                list.appendChild(anchor);
                ul.appendChild(list);
            }
        }
        getTimesAndChapters(string);
        