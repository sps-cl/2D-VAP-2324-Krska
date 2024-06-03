using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ukol2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Zadejte realne cislo prvni casti complexniho cisla:");
            double aReal = double.Parse(Console.ReadLine());
            Console.WriteLine("Zadejte imaginarni cislo prvni casti complexniho cisla:");
            double aImaginary = double.Parse(Console.ReadLine());
            Console.WriteLine("Zadejte opraci + nebo - :");
            char operation = char.Parse(Console.ReadLine());
            Console.WriteLine("Zadejte realne cislo druhe casti complexniho cisla:");
            double bReal = double.Parse(Console.ReadLine());
            Console.WriteLine("Zadejte imaginarni cislo druhe casti complexniho cisla:");
            double bImaginary = double.Parse(Console.ReadLine());

            if (operation == '+') Console.WriteLine(new ComplexNumber(aReal, aImaginary) + new ComplexNumber(bReal, bImaginary));
            else if (operation == '-') Console.WriteLine(new ComplexNumber(aReal, aImaginary) - new ComplexNumber(bReal, bImaginary));
            else Console.WriteLine("spatne zadana operace");

            Console.Read();
        }

        class ComplexNumber
        {
            double real;
            double imaginary;
            public ComplexNumber(double real, double imaginary)
            {
                this.real = real;
                this.imaginary = imaginary;
            }
            public ComplexNumber Add(ComplexNumber other)
            {
                return new ComplexNumber(this.real + other.real, this.imaginary + other.imaginary);
            }
            public ComplexNumber Subtract(ComplexNumber other)
            {
                return new ComplexNumber(this.real - other.real, this.imaginary - other.imaginary);
            }
            public ComplexNumber Multiply(ComplexNumber other)
            {
                return new ComplexNumber(this.real * other.real - this.imaginary * other.imaginary, this.real * other.imaginary + this.imaginary * other.real);
            }
            public ComplexNumber Divide(ComplexNumber other)
            {
                double real = (this.real * other.real + this.imaginary * other.imaginary) / (other.real * other.real + other.imaginary * other.imaginary);
                double imaginary = (this.imaginary * other.real - this.real * other.imaginary) / (other.real * other.real + other.imaginary * other.imaginary);
                return new ComplexNumber(real, imaginary);
            }

            public static ComplexNumber operator +(ComplexNumber a, ComplexNumber b)
            {
                return new ComplexNumber(a.real + b.real, a.imaginary + b.imaginary);
            }
            public static ComplexNumber operator +(double a, ComplexNumber b)
            {
                return new ComplexNumber(b.real + a, b.imaginary + a);
            }
            public static ComplexNumber operator +(ComplexNumber b, double a)
            {
                return new ComplexNumber(b.real + a, b.imaginary + a);
            }

            public static ComplexNumber operator -(ComplexNumber a, ComplexNumber b)
            {
                return new ComplexNumber(a.real - b.real, a.imaginary - b.imaginary);
            }
            public static ComplexNumber operator -(double a, ComplexNumber b)
            {
                return new ComplexNumber(b.real - a, b.imaginary - a);
            }
            public static ComplexNumber operator -(ComplexNumber b, double a)
            {
                return new ComplexNumber(b.real - a, b.imaginary - a);
            }

            public override string ToString()
            {
                return $"reálná část = {real}, imaginární část = {imaginary}";
            }

        }
    }
}