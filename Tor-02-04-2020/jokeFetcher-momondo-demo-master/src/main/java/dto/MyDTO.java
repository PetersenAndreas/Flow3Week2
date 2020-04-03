/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

/**
 *
 * @author andre
 */
public class MyDTO {
    private String joke1;
    private String joke1Ref;
    private String joke2;
    private String joke2Ref;

    public MyDTO() {
    }

    public MyDTO(DadDTO dadDTO, NorrisDTO norrisDTO) {
        this.joke1 = dadDTO.getJoke();
        this.joke2 = norrisDTO.getValue();
        this.joke1Ref = "https://icanhazdadjoke.com/";
        this.joke2Ref = "https://api.chucknorris.io/jokes/random";
    }

    public String getJoke1() {
        return joke1;
    }

    public void setJoke1(String joke1) {
        this.joke1 = joke1;
    }

    public String getJoke2() {
        return joke2;
    }

    public void setJoke2(String joke2) {
        this.joke2 = joke2;
    }

    public String getJoke1Ref() {
        return joke1Ref;
    }

    public void setJoke1Ref(String joke1Ref) {
        this.joke1Ref = joke1Ref;
    }

    public String getJoke2Ref() {
        return joke2Ref;
    }

    public void setJoke2Ref(String joke2Ref) {
        this.joke2Ref = joke2Ref;
    }
    
    
    
}
