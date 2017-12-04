import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
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
