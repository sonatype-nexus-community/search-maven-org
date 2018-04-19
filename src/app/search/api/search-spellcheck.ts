/*
 * Copyright 2018-present Sonatype, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SearchSuggestion } from "./search-suggestion";
import { SearchSuggestionResponse } from "./search-suggestion-response";

export class SearchSpellcheck {

  constructor(public suggestions: any[]) {

  }

  private _suggestion: SearchSuggestion;

  get suggestion(): SearchSuggestion {

    if (!this._suggestion && this.suggestions.length >= 2) {
      this._suggestion = new SearchSuggestion();
      this._suggestion.suggestionResponse = new SearchSuggestionResponse();

      // this is nasty, the response switches these sometimes
      if (this.suggestions[0] instanceof Array) {
        this._suggestion.value = this.suggestions[0];
        this._suggestion.suggestionResponse.suggestion = this.suggestions[1].suggestion;
      } else {
        this._suggestion.value = this.suggestions[1];
        this._suggestion.suggestionResponse.suggestion = this.suggestions[0].suggestion;
      }
    }

    return this._suggestion;
  }

  set suggestion(suggestion: SearchSuggestion) {
    this._suggestion = suggestion;
  }
}
