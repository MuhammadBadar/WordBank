import { Component, OnInit } from '@angular/core';

import { VocabularyVM } from '../ViewModels/vocabulary-vm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css']
})
export class VocabularyComponent implements OnInit {

  word = 'sarcastic';
  x = 10;
  y = 20;
  vocab:  VocabularyVM = {
    Id: 1,
    meaning: 'LMNOP',
    word: 'abut',
    pronunciation: 'ABCD' 
  };

  // vocab = new VocabularyComponent{

  // };
  constructor() { }

  ngOnInit(): void {
  }

  saveForm() : void {
    debugger;
    // Write code to pass data to API methods
    alert(this.vocab.word);
  }
}
