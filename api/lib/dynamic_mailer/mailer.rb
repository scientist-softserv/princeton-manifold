require "dynamic_mailer/configuration"

module DynamicMailer
  class Mailer
    def initialize(_values)
      @config = DynamicMailer::Configuration.new(Settings.instance)
    end

    def deliver!(mail)
      add_defaults!(mail)
      return deliver_test!(mail) if Rails.env.test?
      return deliver_smtp!(mail) if @config.use_smtp?
      return deliver_sendmail!(mail) if @config.use_sendmail?
      handle_send_failure(mail)
    # rubocop:disable Metrics/LineLength
    rescue Net::SMTPAuthenticationError, Net::SMTPServerBusy, Net::SMTPSyntaxError, Net::SMTPFatalError, Net::SMTPUnknownError => e
      # rubocop:enable Metrics/LineLength
      handle_exception(e)
    end

    private

    def handle_exception
      # rubocop:disable Metrics/LineLength
      msg =
        case e.class
        when Net::SMTPAuthenticationError
          "Manifold wasn't able to authenticate against the SMTP server using the stored credentials."
        when Net::SMTPServerBusy
          "The SMTP server appears to be busy. Is it available?"
        when Net::SMTPSyntaxError
          "Manifold received a Net::SMTPSyntaxError while trying to send your message. Double check your SMTP configuration"
        when Net::SMTPFatalError, Net::SMTPUnknownError
          "Manifold ran into a fatal SMTP error. Double check your configuration."
        else
          "Manifold ran into a fatal error. Double check your configuration."
        end
      # rubocop:enable Metrics/LineLength
      raise msg
    end

    def add_defaults!(mail)
      mail.from = @config.from unless mail.from
      mail.reply_to = @config.reply_to unless mail.reply_to
    end

    def handle_send_failure(mail)
      # TODO: How to handle this?
    end

    def deliver_test!(mail)
      mailer = Mail::TestMailer.new(@config.test_config)
      mailer.deliver!(mail)
    end

    def deliver_smtp!(mail)
      mailer = Mail::SMTP.new(@config.smtp_config)
      mailer.deliver!(mail)
    end

    def deliver_sendmail!(mail)
      mailer = Mail::Sendmnail.new(@config.sendmail_config)
      mailer.deliver!(mail)
    end

  end
end
