export default class DateTimeFormat {
  static formater = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  })

  static format(datetime) {
    return DateTimeFormat.formater.format(datetime)
  }
}