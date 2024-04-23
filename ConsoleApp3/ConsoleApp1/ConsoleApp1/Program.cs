using System;
using System.Collections.Generic;

class ConsoleApp{
    private List<string> words = new List<string>();
    private int currentIndex = -1;

    void AddWord(string word){
        words.Add(word);
        currentIndex = words.Count - 1;
        Console.WriteLine(word);
    }

    void GoBack(){
        if (currentIndex > 0)
        {
            currentIndex--;
        }
        Console.WriteLine(words[currentIndex]);
    }

    void GoForward(){
        if (currentIndex < words.Count - 1){
            currentIndex++;
        }
        Console.WriteLine(words[currentIndex]);
    }

    void Run(){
        while (true){
            Console.Write("Vstup: ");
            string command = Console.ReadLine();

            if (command.StartsWith("Pridat:")){
                string word = command.Substring(7);
                AddWord(word);
            }

            else if (command == "Zpet"){
                GoBack();
            }

            else if (command == "Vpred"){
                GoForward();
            }

            else{
                Console.WriteLine("Neznámý příkaz.");
            }
        }
    }

    static void Main(){
        ConsoleApp app = new ConsoleApp();
        app.Run();
    }
}
