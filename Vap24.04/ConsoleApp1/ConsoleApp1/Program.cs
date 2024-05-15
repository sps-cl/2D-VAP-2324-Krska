using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ukol3
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<int, string> words = new Dictionary<int, string>();
            int currentIndex = 0;

            while (true)
            {
                Console.Write("Zadej 1 z příkazů => 1) Pridat:  2) Zpet  3) Vpred");
                string input = Console.ReadLine();

                if (input.StartsWith("Pridat:"))
                {
                    string wordToAdd = input.Substring(7);
                    words[currentIndex] = wordToAdd;
                    Console.WriteLine($"Slovo přidáno: {wordToAdd}");
                    currentIndex++;
                }
                else if (input == "Zpet")
                {
                    if (currentIndex > 0)
                    {
                        currentIndex--;
                        Console.WriteLine($"Zobrazené slovo: {words[currentIndex]}");
                    }
                    else
                    {
                        Console.WriteLine("První přidané slovo.");
                    }
                }
                else if (input == "Vpred")
                {
                    if (currentIndex < words.Count - 1)
                    {
                        currentIndex++;
                        Console.WriteLine($"Zobrazené slovo: {words[currentIndex]}");
                    }
                    else
                    {
                        Console.WriteLine("Posledně přidané slovo.");
                    }
                }
                else
                {
                    Console.WriteLine("Neznámý příkaz. Zkus to znovu.");
                }
            }
        }
    }
}