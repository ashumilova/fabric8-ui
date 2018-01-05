import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Codebase } from '../space/create/codebases/services/codebase';
import { CodebasesService } from '../space/create/codebases/services/codebases.service';

@Injectable()
export class CodebaseResolver implements Resolve<Codebase> {

  constructor(private codebasesService: CodebasesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Codebase> {
    let id = route.paramMap.get('codebase');
    // Resolve the context
    return this.codebasesService.getCodebase(id);
  }
}
