
using System;

using System.Linq;
 
namespace ConsoleApp

{

    class Program

    {
        static void Main(string[] args)

        {
            while (true)
            {

                Console.WriteLine("Zadej sekvenci čísel:");

                string input = Console.ReadLine();

                string[] numbers = input.Split(',');

                int[] parsedNumbers;
                try

                {

                    parsedNumbers = numbers.Select(int.Parse).ToArray();

                }

                catch (FormatException)
                {

                    Console.WriteLine("Některý z vstupů není celé číslo. Zadejte prosím znovu.");

                    continue;

                }
                int min = parsedNumbers.Min();

                int max = parsedNumbers.Max();

                int longestAscendingInterval = GetLongestAscendingInterval(parsedNumbers);

                Console.WriteLine($"Nejmenší číslo je {min}.");

                Console.WriteLine($"Největší číslo je {max}.");

                Console.WriteLine($"Délka nejdelšího vzestupného intervalu je {longestAscendingInterval}.");

                Console.WriteLine("Chcete pokračovat? (ano/ne)");

                string choice = Console.ReadLine();

                if (choice.ToLower() != "ano")

                    break;
            }
        }
        static int GetLongestAscendingInterval(int[] numbers)

        {
            int longestInterval = 0;

            int currentInterval = 1;

            for (int i = 1; i < numbers.Length; i++)

            {
                if (numbers[i] > numbers[i - 1])

                    currentInterval++;
                else

                {

                    if (currentInterval > longestInterval)

                        longestInterval = currentInterval;

                    currentInterval = 1;

                }

            }

            if (currentInterval > longestInterval)

                longestInterval = currentInterval;

            return longestInterval;

        }

    }

}
