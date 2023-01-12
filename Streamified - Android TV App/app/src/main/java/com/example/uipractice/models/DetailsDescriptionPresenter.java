package com.example.uipractice.models;

import androidx.leanback.widget.AbstractDetailsDescriptionPresenter;

import com.example.uipractice.models.Movie;

public class DetailsDescriptionPresenter extends AbstractDetailsDescriptionPresenter {

    @Override
    protected void onBindDescription(ViewHolder viewHolder, Object item) {
        Movie movie = (Movie) item;

        if (movie != null) {
            viewHolder.getTitle().setText(movie.getTitle());
        }
    }
}