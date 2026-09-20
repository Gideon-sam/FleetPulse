package JavaExercises.DatatypePrograms;

public class TypeCastingExample {
    public static void main(String[] args) {
        int num = 100;
        double converted = num; // implicit casting
        double d = 45.75;
        int convertedBack = (int) d; // explicit casting

        System.out.println("Integer: " + num);
        System.out.println("Converted to double: " + converted);
        System.out.println("Double: " + d);
        System.out.println("Converted to int: " + convertedBack);
    }
}
