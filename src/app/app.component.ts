import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Component, ElementRef, Renderer } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	//title = 'app';

	user: Observable<firebase.User>;
	items: FirebaseListObservable<any[]>;
	msgVal: string = '';
  el: ElementRef;

	constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private elRef: ElementRef, private renderer: Renderer) {
  	this.items = af.list('/list-items', {
    		query: {
    			orderByChild: 'time',
      		limitToFirst: 30
    		}
  	});

  	this.user = this.afAuth.authState;
    this.el = elRef;
	}

  login() {
    	this.afAuth.auth.signInAnonymously();
	}

	logout() {
	    this.afAuth.auth.signOut();
	}

	Send(desc: string) {
    console.log(this.af);
    this.items.push({
      time: new Date().getTime(),
      listitem: desc
    });
    this.msgVal = '';
	}

	remove(item) {
    this.items.remove(item);
	}

  update(value: string, item) {
    console.log(value, item.listitem);
    this.items.update(item.$key, {listitem: value});
  }

  showEdit(e) {
    if (!e.parentNode.classList.contains('edit')) {
      //console.log('class exists');
      e.parentNode.classList.add('edit');
    } else {
      //console.log('class exists not');
      e.parentNode.classList.remove('edit');
    }
  }

  //onClickedOutside(e: Event) {
  //  console.log('Clicked outside:', e);
  //}

  reverseList() {
    var list = document.getElementById("id01");
    var i = list.childNodes.length;
    
    while (i--) {
      list.appendChild(list.childNodes[i]);
    }
  }

  sortList() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("id01");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    //Make a loop that will continue until no switching has been done:
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("LI");
      //Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*check if the next item should switch place with the current item,
        based on the sorting direction (asc or desc):*/
        if (dir == "asc") {
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            /*if next item is alphabetically lower than current item,
            mark as a switch and break the loop:*/
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
            /*if next item is alphabetically higher than current item,
            mark as a switch and break the loop:*/
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        //Each time a switch is done, increase switchcount by 1:
        switchcount ++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

}

