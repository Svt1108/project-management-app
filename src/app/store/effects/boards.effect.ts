import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, of, catchError } from 'rxjs';
import { ApiMainHelpersService } from 'src/app/main/services/api-main-helpers.service';
import * as BoardsActions from '../actions/boards.action';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private apiBoards: ApiMainHelpersService,
  ) {}

  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.loadBoards),
      switchMap(() =>
        this.apiBoards.getAllBoards().pipe(
          map((value) =>
            BoardsActions.loadBoardsSuccess({
              boards: value,
            }),
          ),
          catchError((error) => of(BoardsActions.loadBoardsFailure({ error }))),
        ),
      ),
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.createBoard),
      switchMap(({ boards: value }) =>
        this.apiBoards.createBoard(value).pipe(
          map((board) => BoardsActions.createBoardSuccess(board)),
          catchError((error) =>
            of(BoardsActions.createBoardFailure({ error })),
          ),
        ),
      ),
    );
  });
}
